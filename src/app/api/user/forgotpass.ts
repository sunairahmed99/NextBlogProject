import {connect} from '@/Configdb/config';
import User from '@/Models/UserSchema';
import crypto from 'crypto';
import { ForgotEmail } from '@/utils/ForgotEmail';
import { NextRequest, NextResponse } from 'next/server';

connect()

interface forgotreq extends NextRequest{
    protocol?:any,
    get?:any,
    host?:any
}

export async function POST(req:forgotreq){

    let reqbody = await req.json()
    let email = reqbody.email
    let host = req.headers.get('host') as string

    let user = await User.findOne({email})

    if(!user){

        return NextResponse.json({
            status:204,
            message:'user not found'
        })
    }

    let randomcrypto =crypto.randomBytes(12).toString('hex');
    let restoken = crypto.createHash('sha256').update(randomcrypto).digest('hex');
    let Dates = Date.now() + 10 * 60 * 1000

    user.passwordResetToken = restoken
    user.passwordResetExpire = Dates

    const reseturl = `http://${host}/api/user/resetpassword`;
    let message = `Reset password link. Copy this link and paste it in your browser to change your password: ${reseturl}`;

    try{

        ForgotEmail({
            email:user.email,
            subject:'Reset Password Link',
            text:message
        })

        return NextResponse.json({
            status:200,
            message:'link sent successfully to your mail'
        })

    }catch(err){

        user.passResetToken = undefined
        user.passResetExp = undefined

        return NextResponse.json({
            status:204,
            message:'something wrong try again or try later'
        })
    }
}