"use client"
import axios from 'axios';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";

  type Inputs = {
    comment: string,
  };

  interface blogdata{
    image:string,
    name:string,
    _id:string,
    userid:{
        name:string
    },
    description:string,
    category:{
      name:string
    },
  }

export default function BlogDetail() {
    const {register, handleSubmit,reset,formState: { errors } } = useForm<Inputs>();
    let[getdatas, setdatas] = React.useState<any>()
    let[getblogs, setblogs] = React.useState<any>()
    let {id}:any = useParams()


    const onSubmit: SubmitHandler<Inputs> = data =>{

        let formData = new FormData()

        formData.append('comment',data.comment)
        formData.append('blogid',id)
        createcomment(formData)
        //route.push('/')
    }

    const createcomment =async (formData:any)=>{
        try{
     
            let token = localStorage.getItem('token')
            if(!token){
                alert('please login first')
            }
            else{

                await axios.post(`http://localhost:3000/api/Comment`,formData,{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })
                alert('comment submitted successfully')
                reset()
            }
        }catch(err){
            return err
        }
    }


    useEffect(()=>{

      const getcomment =async ()=>{
        try{
    
                let response = await axios.get(`http://localhost:3000/api/Comment/${id}`)
                setdatas(response.data.data)
            
        }catch(err){
            return err
        }
      }
      const getblog =async ()=>{
        try{
    
                let response = await axios.get(`http://localhost:3000/api/BlogDetail/${id}`)
                setblogs(response.data.data)
            
        }catch(err){
            return err
        }
    }

        getcomment()
        getblog()

    },[id])

  return (
    <>
    <div className='grid grid-cols-1 lg:grid-cols-5'>

        {
            getblogs && 
            <div className='lg:col-span-3'>
            
            <Image src={`/blog/${getblogs.image}`} alt="" className='mt-[30px] lg:m-[40px] h-[300px]  lg:w-[700px] lg:h-[470px] border border-blue-300 rounded-lg' height={300} width={300}  priority/>

            <div className='lg:m-[40px] text-white  lg:w-[750px]'>
                <h1 className='font-bold text-xl pb-[20px] text-center md:text-left mt-[5px]  lg:mt-[-20px]'>{getblogs.name}</h1>
                <p className='leading-loose text-center md:text-left p-[10px] md:p-[0px]'>{getblogs.description}</p>
            </div>
                <h1 className='text-center mt-[10px] text-white font-bold text-[30px]'>All Comments</h1>
               

            <div className='lg:w-[700px] mt-[15px]'>
            <ul role="list" className="divide-y divide-gray-100">
      {getdatas && getdatas.length === 0 ? (<h1 className='text-white'>No Comment this blog</h1>) : getdatas && getdatas.map((per:any,index:number) => (
        <li key={index} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
    {
    per.userid && per.userid.image ?
    <Image className="h-12 w-12 flex-none rounded-full bg-gray-50" src={`/user/${per.userid && per.userid.image && per.userid.image}`} alt="" height={8} width={8}  priority/> :
    <Image className="h-12 w-12 flex-none rounded-full bg-gray-50" src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' alt="" height={8} width={8}  priority/> 
    }
            
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-white">{per.userid && per.userid.name}</p>
              <p className="mt-1 truncate text-xs leading-5 text-white">{per.userdid && per.userid.email}</p>
              <p className='pt-[20px] text-white sm:block md:hidden'>
               {per.comment}
              </p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end w-[420px]">
            <p className="text-sm leading-6 text-white">{per.comment}</p>
           
          </div>
        </li>
      ))}
    </ul>
            </div>    


        </div>
        }

       

        <div className='lg:col-span-2 lg:w-[500px] lg:h-[100vh] my-[40px] lg:mt-[170px]'>
        <form noValidate className="space-y-5" method="POST" onSubmit={handleSubmit(onSubmit)}>


        <div>
        <label htmlFor="com" className="block text-sm font-medium leading-6 text-white">
           <h1 className='text-center'>Leave A Comment</h1>
        </label>
        <div className="mt-2">
            <input
            id="com"
            {...register("comment", { required:'comment required'})}
            type="text"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
        </div>
        {errors.comment && <p className='text-red-500'>{errors.comment.message}</p>}
        </div>
        <div>
        <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
            Comment
        </button>
        
        </div>
        </form>

        </div>

    </div>
    </>
  )
}
