import {connect} from '@/Configdb/config';
import User from '@/Models/UserSchema';
import { NextRequest, NextResponse } from 'next/server';

connect()


export async function GET(req:NextRequest):Promise<any>{
    try{

        let alluser = await User.find()

        return NextResponse.json({
            status:200,
            data:alluser
        })

    }catch(err){

        return NextResponse.json({
            status:204,
            message:'something went wrong'
        })

    }

}