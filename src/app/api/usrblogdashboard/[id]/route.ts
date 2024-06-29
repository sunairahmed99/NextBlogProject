import {connect} from '@/Configdb/config';
import { cookies } from 'next/headers';
import Blog from '@/Models/BlogSchema';
import { NextRequest, NextResponse } from 'next/server';

connect()

export async function GET(req:NextRequest,{params}:{params:{id:string}}):Promise<any>{
    try{

        let {id} = params
        let token = req.cookies.get('tokenn')?.value
        console.log(token)        
    
        if(!token){
            return NextResponse.json({
                status:204,
                message:'please login'
            })
        }

        let newblog = await Blog.find({userid:id}).populate('category').populate('userid')        

        return NextResponse.json({
            status:200,
            data:newblog
        })

    }catch(err){
        console.log(err)
        return NextResponse.json({
            status:204,
            message:'something went wrong'
        })
    }
}