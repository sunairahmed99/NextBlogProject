import {connect} from '@/Configdb/config';
import Hblog from '@/Models/HomeBlogSchema';
import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';

connect()


export async function POST(req:NextRequest):Promise<any>{
    try{

        let reqbody = await req.formData()
        let name = reqbody.get('bname') as string
        let description = reqbody.get('bdescription') as string
        let image = reqbody.get('bimage') as File
        let category = reqbody.get('category') as string
        let newblog;

        if(image !== undefined && image !== null){
            try{

                let byteData = await image.arrayBuffer()
                let buffer = Buffer.from(byteData)
                let path = `./public/homeblog/${image.name}`
                await writeFile(path,buffer)
                

            }catch(err){
                return err
            }

            newblog  =  await Hblog.create({
                name,
                description,
                category,
                image:image.name,
            })
        }
        else{

            newblog = await Hblog.create({
                name,
                description,
                category,
            })
        }

    

        return NextResponse.json({
            status:200,
            data:newblog
        })

    }catch(err){
        return NextResponse.json({
            status:204,
            message:'something went wrong'
        })
    }
}

export async function GET():Promise<any>{
    try{

        let newblog = await Hblog.find().populate('category')

        return NextResponse.json({
            status:200,
            data:newblog
        })

    }catch(err){
        return NextResponse.json({
            status:204,
            message:'something went wrong'
        })
    }
}