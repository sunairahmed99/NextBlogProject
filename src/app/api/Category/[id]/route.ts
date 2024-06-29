import {connect} from '@/Configdb/config';
import Category from '@/Models/CategorySchema';
import { NextRequest, NextResponse } from 'next/server';

connect()



export async function GET(req:NextRequest,{params}:{params:{id:string}}):Promise<any>{

    try{

        let {id} = params
        let newcat = await Category.findById(id)

        return NextResponse.json({
            status:200,
            data:newcat
        })

        }catch(err){
            console.log(err)
            return NextResponse.json({
                status:204,
                message:'something went wrong'
            })
        }

}

export async function PATCH(req:NextRequest,{params}:{params:{id:string}}):Promise<any>{

    try{
        let {id} = params

        let reqbody =await req.json()

        let{name} = reqbody
        

        let newblog;
    
            newblog = await Category.findByIdAndUpdate(id,{name},{
                new:true,
                runValidators:true
            })
    

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

export async function DELETE(req:NextRequest,{params}:{params:{id:string}}):Promise<any>{

    try{

        let {id} = params

        let newcat = await Category.findByIdAndDelete(id)


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