import {connect} from '@/Configdb/config';
import Category from '@/Models/CategorySchema';
import { NextRequest, NextResponse } from 'next/server';

connect()

export async function POST(req:NextRequest):Promise<any>{
    try{

        let reqbody = await req.json()
        let{name} = reqbody

        let newcat = await Category.create({name})

        return NextResponse.json({
            status:200,
            data:newcat
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

        let newcat = await Category.find()

        return NextResponse.json({
            status:200,
            data:newcat
        })

    }catch(err){
        return NextResponse.json({
            status:204,
            message:'something went wrong'
        })
    }
}