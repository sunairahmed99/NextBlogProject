import {connect} from '@/Configdb/config';
import User from '@/Models/UserSchema';
import { useParams } from 'next/navigation';
import crypto from 'crypto';
import { NextRequest, NextResponse, userAgent } from 'next/server';


export async function PATCH(req:NextRequest,{params}:{params:{id:string}}):Promise<any>{
    try{

        let{id} = params
        let reqbody = await req.json()
        let{password} = reqbody
        let token = id

        if(!token){
            return NextResponse.json({
                status:204,
                message:'please forgot pass again link expire'
            })
        }

        let restoken = crypto.createHash('sha256').update(token).digest('hex');

        let getuser = await User.findOne({passResetToken:restoken})

        if(!getuser){
            return NextResponse.json({
                status:204,
                message:'please forgotpass again'
            })
        }

        getuser.passResetToken = undefined
        getuser.passResetExp = undefined
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