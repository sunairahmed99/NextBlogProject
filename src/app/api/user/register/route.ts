import {connect} from '@/Configdb/config'
import User from '@/Models/UserSchema'
import { cookies } from 'next/headers';
import { writeFile } from 'fs/promises'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

connect()

export async function POST(req:NextRequest):Promise<any>{
    try{

        let reqbody =await req.formData()
        let name =  reqbody.get('name') as string
        let email = reqbody.get('email') as string
        let password = reqbody.get('password') as string
        let image = reqbody.get('image') as File


        let newuser;

        if(image.name){
            try{
                let byteData = await image.arrayBuffer()
                let buffer = Buffer.from(byteData)
                let path = `./public/user/${image.name}`
                await writeFile(path,buffer)

            }catch(err){
                return NextResponse.json({
                    status:204,
                    message:'something wrong'
                })

            }

            newuser  =  await User.create({
                name,
                email,
                password,
                image:image.name,
            })
        }
        else{

            newuser = await User.create({
                name,
                email,
                password,
            })
        }

        let token = jwt.sign({id:newuser._id},process.env.SECRETKEY,{
            expiresIn:'1d'
        })

        cookies().set({
            name: 'tokenn',
            value: token,
            maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
            httpOnly: true,
            path: '/',
          })


        return NextResponse.json({
            status:200,
            token,
            data:newuser
        })

    }catch(err){
        return NextResponse.json({
            status:204,
            message:'email already registered'
        })
    }
}