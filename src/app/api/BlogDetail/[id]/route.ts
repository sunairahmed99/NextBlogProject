import {connect} from '@/Configdb/config';
import Blog from '@/Models/BlogSchema';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(req:NextRequest,{params}:{params:{id:String}}):Promise<any>{
    try{

        let {id} = params

        let newblog = await Blog.findById(id)

        return NextResponse.json({
            status:200,
            data:newblog

        })

    }catch(err){
        return NextResponse.json({
            status:200,
            message:'something went wrong'
        })
    }
}