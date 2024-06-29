"use client"
import React, { useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import {useForm, SubmitHandler } from "react-hook-form";
import { getUser, userdata } from '@/redux/Slice/UserSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/redux/store'

type Inputs = {
    name:string,
  };

export default function Admincat(){
    const { register, handleSubmit,formState: { errors } } = useForm<Inputs>();
    const dispatch = useDispatch<AppDispatch>()
    const {user} = useSelector(userdata)
    const route = useRouter() 

    const onSubmit: SubmitHandler<Inputs> = data =>{
      
      createcategories(data)
    }

    const createcategories =async (data:any)=>{
        try{

            await axios.post('http://localhost:3000/api/Category',data)
            route.push('Dashboard_category_sel')

        }catch(err){
            return err
        }
    }

    useEffect(()=>{
      let token = localStorage.getItem('token')
        if(token){
          dispatch(getUser(token))
        }

    },[dispatch])

  return (
    <>
    {
      user && user.role === 'admin' &&

<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 text-white">
<div className="sm:mx-auto sm:w-full sm:max-w-sm">
 
  <h2 className="mt-1 text-center text-2xl font-bold leading-9 tracking-tight text-white">
    Admin Create Category
  </h2>
</div>

<div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
  <form noValidate className="space-y-5" method="POST"  onSubmit={handleSubmit(onSubmit)}>

 
    <div>
      <div className="flex items-center justify-between">
        <label htmlFor="category" className="block text-sm font-medium leading-6 text-white">
          Category Name
        </label>
        
      </div>
      <div className="mt-2">
        <input
          id="category"
          {...register("name", { required:'category required'})}
          type="text"
          className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
      {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
      </div>

    <div>
     
    </div>
    <div>
      <button
        type="submit"
        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Create Category
      </button>
    </div>
  </form>
</div>
</div>

    }
    
  </>
  )
}
