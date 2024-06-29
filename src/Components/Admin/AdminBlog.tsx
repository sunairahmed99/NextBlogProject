"use client"
import React, { useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from "react-hook-form";
import { getUser, userdata } from '@/redux/Slice/UserSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/redux/store'

type Inputs = {
    bname:string,
    category:string,
    bimage:string,
    bdescription:string
  };

export default function AdminBlog(){
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    let[getdatas, setdatas] = React.useState<null |[]>()
    const dispatch = useDispatch<AppDispatch>()
    const {user} = useSelector(userdata)
    const route = useRouter()

    const onSubmit: SubmitHandler<Inputs> = data =>{

        let formData = new FormData()
        formData.append('bname',data.bname)
        formData.append('category',data.category)
        formData.append('bimage',data.bimage[0])
        formData.append('bdescription',data.bdescription)

        createHomeblog(formData)
        // route.push('/Admin/Dashboard_Homeblogsel')
    }

    const createHomeblog =async (data:any)=>{
        let token = localStorage.getItem('token')
        try{

            let response = await axios.post('http://localhost:3000/api/Blog',data,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
          
            route.push('Dashboard_Blog_sel')
            return response.data.data


        }catch(err){
            return err
        }
    }

    useEffect(()=>{
        getdata()
        let token = localStorage.getItem('token')
        if(token){
          dispatch(getUser(token))
        }
    },[dispatch])
    

    const getdata =async ()=>{
        try{

            let response = await axios.get('http://localhost:3000/api/Category/')
            setdatas(response.data.data)
        }catch(err){
            return err
        }
    }

  return (
    <>
    {
      user && user.role === 'admin' &&

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
       
        <h2 className="mt-1 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Admin Create  Blog
        </h2>
      </div>

      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
        <form noValidate className="space-y-5" method="POST"  onSubmit={handleSubmit(onSubmit)}>

       
            <div>
            <div className="flex items-center justify-between">
              <label htmlFor="bname" className="block text-sm font-medium leading-6 text-white">
                Blog Name
              </label>
              
            </div>
            <div className="mt-2">
              <input
                id="bname"
                {...register("bname", { required:'Name required'})}
                type="text"
                className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {errors.bname && <p className='text-red-500'>{errors.bname.message}</p>}
            </div>

            <div>
            <div className="flex items-center justify-between">
              <label htmlFor="category" className="block text-sm font-medium leading-6 text-white">
                Category
              </label>
              
            </div>
            <div className="mt-2">
            <select
                  id="category"
                  {...register("category", { required:'category required'})}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                    <option defaultValue={'select'} >Select Category</option>
                    {
                        getdatas && getdatas.map((cat:({name:string, _id:string}),index)=>{
                            return(
                                <option  key={index} value={cat._id}>{cat.name}</option>
                            )
                        })
                    }
                </select>
            </div>
            {errors.category && <p className='text-red-500'>{errors.category.message}</p>}
            </div>

            <div>
            <div className="flex items-center justify-between">
              <label htmlFor="bimage" className="block text-sm font-medium leading-6 text-white">
                Blog Image
              </label>
              
            </div>
            <div className="mt-2">
              <input
                id="bimage"
                {...register("bimage")}
                type="file"
                className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {errors.bimage && <p className='text-red-500'>{errors.bimage.message}</p>}
            </div>

            <div>
            <div className="flex items-center justify-between">
              <label htmlFor="bdescription" className="block text-sm font-medium leading-6 text-white">
                Blog Description
              </label>
              
            </div>
            <div className="mt-2">
              <input
                id="bdescription"
                {...register("bdescription", { required:'description required'})}
                type="text"
                className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {errors.bdescription && <p className='text-red-500'>{errors.bdescription.message}</p>}
            </div>

          <div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create Blog
            </button>
          </div>
        </form>
      </div>
    </div>
    }
    
  </>
  )
}
