import {connect} from '@/Configdb/config';
import User from '@/Models/UserSchema';
import { NextRequest, NextResponse } from 'next/server';

connect()


export async function DELETE(req:NextRequest,{params}:{params:{id:string}}){
    try{
        let {id} = params

        let alluser = await User.findByIdAndDelete(id)

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