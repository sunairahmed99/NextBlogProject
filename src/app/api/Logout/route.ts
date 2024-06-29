import {connect} from '@/Configdb/config';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers'

connect()

export async function DELETE(req:NextRequest):Promise<any>{
    cookies().delete('tokenn')

    return NextResponse.json({
        status:200,
        message:'success'
    })
}