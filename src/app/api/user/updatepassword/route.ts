import {connect} from '@/Configdb/config';
import User from '@/Models/UserSchema';
import { useParams } from 'next/navigation';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse, userAgent } from 'next/server';
import { Authrequest, protect } from "@/app/api/protectapi";

connect()


export async function PATCH(req:NextRequest):Promise<any>{

    let authdata = req as Authrequest
    let protection = await protect(authdata)

    if(!protection){
        return NextResponse.json({
            status:204,
            message:'please login'
        })
    }
    try{
      
        let currentuser = authdata.user
        let reqbody = await req.json()
        let{oldpassword,password} = reqbody
        
        let getuser = await User.findById(currentuser._id).select('+password');

        let hashpass = await bcrypt.compare(oldpassword,getuser.password)
        
        if(!hashpass){
            return NextResponse.json({
                status:204,
                message:'oldpassword wrong'
            })
        }

         getuser.password = password
         await getuser.save()

        return NextResponse.json({
            status:200,
            data:'password changed successfully'
        })

    }catch(err){
        return NextResponse.json({
            status:500,
            message:'something wrong try later'
        })

    }
}