import {connect} from '@/Configdb/config'
import { NextRequest, NextResponse } from 'next/server';
import Comment from '@/Models/CommentSchema';

connect()

export async function GET(req:NextRequest,{params}:{params:{id:string}}):Promise<any>{
    try{

        let{id} = params
      
        let newcoment = await Comment.find({blogid:id}).populate('userid').populate('blogid')

        return NextResponse.json({
            status:200,
            data:newcoment
        })
    }catch(err){
        return NextResponse.json({
            status:204,
            message:'something went wrong'
        })
    }
}

export async function DELETE(req:NextRequest,{params}:{params:{id:string}}):Promise<any>{
    try{

        let{id} = params
      
        let newcoment = await Comment.findByIdAndDelete(id)

        return NextResponse.json({
            status:200,
            data:newcoment
        })
    }catch(err){
        return NextResponse.json({
            status:204,
            message:'something went wrong'
        })
    }
}