"use client"
import axios from 'axios'
import Image from 'next/image';
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface blogdata{
  image:string,
  name:string,
  _id:string,
  description:string,
  category:{
    name:string
  }

}

export default function Blogcat() {
  let[getdatas, setdatas] = React.useState<null | blogdata[]>()
  let[catdatas, setcatdatas] = React.useState<null | blogdata[]>(null)
  let {id} = useParams()



const catdata =async ()=>{
  try{

      let response = await axios.get('http://localhost:3000/api/Category/')
      setcatdatas(response.data.data)
  }catch(err){
      return err
  }
}

useEffect(()=>{
  const getdata =async ()=>{
    try{

        let response = await axios.get(`http://localhost:3000/api/Blogcategory/${id}`)
        setdatas(response.data.data)
    }catch(err){
        return err
    }
}
  getdata()
  catdata()
},[id])



  return (
    <>
     <div className="flex justify-between items-center  flex-wrap my-[40px]  md:my-[70px] lg:p-4  mb-4 md:p-4 p-4">
    {
      
      getdatas && getdatas.map((blog:blogdata,index:number)=>{
        return(
          <div key={index}>
        
           <div className=" md:w-[350px] w-full items-center mb-[20px]  md:mb-[40px]">
        
           <Link href={`/BlogDetail/${blog._id}`}>
           <Image src={`/blog/${blog.image}`} alt="" className="lg:w-[350px] h-[250px] w-80%" style={{ border: "15px solid blue", borderRadius: "40px 20px"}} height={200} width={200}  priority/>
           </Link>
        
          <div className="text-white pt-3 lg:pl-2 text-center md:text-start">
        
           <Link className="bg-blue-800 text-blue-500 font-bold py-2  px-4 rounded-lg" href={`/BlogDetail/${blog._id}`}>{blog.category.name}</Link>
           <h1 className="pt-2">{blog.name}</h1>
           <p className="text-gray-400 text-center -ml-2  pt-2 lg:md:leading-8 " style={{ maxHeight: "8em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "normal", position: "relative" }}>
            {blog.description}
           </p>
           </div>
           </div>
           </div>
        )
      })
    }   
      </div>

     <div className="border-2 border-black-700 my-6"></div>
        
           <div className="my-6">
               <div className="md:mx-auto md:w-[500px] text-center">
                {
                  catdatas && catdatas.map((cat:{name:string,_id:string},index:number)=>{
                    return(
                      <Link key={index} href={`/Blogcat/${cat._id}`}><button className="bg-blue-800 text-blue-500 font-bold py-2 m-2   px-4 rounded-lg">{cat.name}</button></Link>
                    )

                  })
                }
               </div>
              
           </div> 

    </>
  )
}




  
