import {connect} from '@/Configdb/config'
import { NextRequest, NextResponse } from 'next/server';
import {Authrequest,protect } from '@/app/api/protectapi';
import Comment from '@/Models/CommentSchema';

connect()

export async function POST(req:NextRequest):Promise<any>{
    try{
        

        let authdata = req as Authrequest
        let protection = await protect(authdata)
        
        if(!protection){
            return NextResponse.json({
                status:204,
                message:'please login'
            })
        }
    
        let currentuser = authdata.user
        let id = currentuser._id
        let reqbody = await req.formData()
        let comment = reqbody.get('comment') as string
        let blogid = reqbody.get('blogid') as string
        

        let newcoment = await Comment.create({
            comment,
            userid:id,
            blogid
        })

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

export async function GET(req:NextRequest):Promise<any>{
    try{
      
        let newcoment = await Comment.find().populate('userid').populate('blogid')

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