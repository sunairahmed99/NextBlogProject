import {connect} from '@/Configdb/config';
import User from '@/Models/UserSchema';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

connect()

export async function POST(req:NextRequest,res:NextResponse):Promise<any>{
    try{

        let reqbody = await req.json()

    let{email,password} = reqbody

    let newuser = await User.findOne({email:email}).select('+password')

    if(!newuser){
        return NextResponse.json({
            status:204,
            message:'invalid email and password'
        })
    }

    let hashpassword = await bcrypt.compare(password,newuser.password)

    if(!hashpassword){
        return NextResponse.json({
            status:204,
            message:'invalid email and password'
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
            message:'something went wrong try later'
        })
    }

    
}