import {connect} from '@/Configdb/config';
import { writeFile,unlink } from 'fs/promises';
import pathdata from 'path'
import { NextRequest, NextResponse } from 'next/server';
import Blog from '@/Models/BlogSchema';


connect()

export async function GET(req:NextRequest,{params}:{params:{id:string}}):Promise<any>{

    try{

        let {id} = params
        let newblog = await Blog.findById(id).populate('category')

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

export async function PATCH(req:NextRequest,{params}:{params:{id:string}}):Promise<any>{

    try{
        let {id} = params

        let reqbody =await req.formData()
        let name = reqbody.get('name') as string
        let description = reqbody.get('description') as string
        let category = reqbody.get('category') as string
        let image = reqbody.get('image') as File
        let oldimage = reqbody.get('oldimage') as any
      

        let newblog;
    
        if(typeof image === 'string'){
            newblog  =  await Blog.findByIdAndUpdate(id,{name,description,category,image:image},{
                new:true,
                runValidators:true
            })

        }
        else if(image){
          
            try{

                let byteData = await image.arrayBuffer()
                let buffer = Buffer.from(byteData)
                let path = `./public/blog/${image.name}`
                await writeFile(path,buffer)

                if(oldimage){
                    const oldimagepath = pathdata.join(__dirname,`public/homeblog/${oldimage}`);

                    try {
                        await unlink(oldimagepath);
                        
                    } catch (error:any) {
                        if (error.code !== 'ENOENT') {
                            console.error('Error deleting old image:', error);
                        } else {
                            console.log('Old image does not exist, no need to delete');
                        }
                    }
                }

            }catch(err){
                return NextResponse.json({
                    status:204,
                    message:'something went wrong'
                })

            }

            newblog  =  await Blog.findByIdAndUpdate(id,{name,description,category,image:image.name},{
                new:true,
                runValidators:true
            })
              
        }
        else{

            newblog = await Blog.findByIdAndUpdate(id,{name,description,category,},{
                new:true,
                runValidators:true
            })
        }


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

        let newblog = await Blog.findByIdAndDelete(id)


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