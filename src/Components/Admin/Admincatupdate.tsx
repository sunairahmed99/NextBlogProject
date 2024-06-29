"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { getUser, userdata } from '@/redux/Slice/UserSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/redux/store'


interface Inputs{
    category:string,
    name:string
  };

export default function Admincatupdate(){
    const { register, handleSubmit,formState: { errors } } = useForm<Inputs>();
    const [getdatas, setdatas] = useState<Inputs | null>(null);
    const dispatch = useDispatch<AppDispatch>()
    const {user} = useSelector(userdata)
    const route = useRouter()
    let{id} = useParams() 

    const onSubmit: SubmitHandler<Inputs> = data =>{
      
      createcategories(data)
    }

    const createcategories =async (data:any)=>{
        try{

            await axios.patch(`http://localhost:3000/api/Category/${id}`,data)
            route.push('/Admin/Dashboard_category_sel')

        }catch(err){
            return err
        }
    }

    useEffect(()=>{

      const getdata =async ()=>{
        try{

            let response = await axios.get(`http://localhost:3000/api/Category/${id}`)
            setdatas(response.data.data)
        }catch(err){
            return err
        }
    }
      getdata()
      let token = localStorage.getItem('token')
      if(token){
        dispatch(getUser(token))
      }
      
  },[dispatch,id])

  return (
    <>
    {
      user && user.role === 'admin' &&
        getdatas &&
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
       
        <h2 className="mt-1 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Admin Update Category
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
                defaultValue={getdatas.name}
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
              Update Category
            </button>
          </div>
        </form>
      </div>
    </div>
    }
    
  </>
  )
}
