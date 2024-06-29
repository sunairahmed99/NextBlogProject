import { NextRequest, NextResponse } from "next/server";
import { Authrequest, protect } from "@/app/api/protectapi";


export async function GET(req:NextRequest):Promise<any>{
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
    
        return NextResponse.json({
            status:200,
            data:currentuser
        })

    }catch(err){

        return NextResponse.json({
            status:204,
            data:'somethin went wrong'
        })

    }
}