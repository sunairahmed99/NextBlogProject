import {connect} from '@/Configdb/config';
import Blog from '@/Models/BlogSchema';
import { NextRequest, NextResponse } from 'next/server';

connect()


export async function GET(req:NextRequest,{params}:{params:{id:string}}):Promise<any>{
    try{

        let {id} = params

        let newblog = await Blog.find({category:id}).populate('category')

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