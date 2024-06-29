"use client"
import {forgotUser, updateprofile, userdata } from '@/redux/Slice/UserSlice';
import Image from 'next/image';
import { AppDispatch } from '@/redux/store';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState }  from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';

type Inputs = {
    email: string,
    image:string
  };



export default function ProfileEdit() {
    const {register, handleSubmit,formState: { errors } } = useForm<Inputs>();
    const dispatch = useDispatch<AppDispatch>()
    const[getimage,setimage] = React.useState()
    const {user} = useSelector(userdata)
    let userdatas = user
    let {id} = useParams()
    const route = useRouter()
    const{errmsg,loading} = useSelector(userdata)
    

    const onSubmit: SubmitHandler<Inputs> =async data =>{

      let token = localStorage.getItem('token')
      let formData = new FormData()
      let image = getimage ? getimage : userdatas.image
      let oldimage = userdatas.image

      formData.append('email',data.email)
      formData.append('image',image)
      formData.append('oldimage',oldimage)

      const check = await dispatch(updateprofile({id,formData,token}))

      if(check.type === 'users/profile/fulfilled'){
        route.push('/profile')
      } 
    }

    useEffect(()=>{

      if(id !== userdatas._id){

        return route.push('/profile')
      }

    },[id,route,userdatas._id])
   
    
  return (
    <>
    {
        userdatas && id == userdatas._id &&
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 text-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
         
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Profile Edit Page
          </h2>
        </div>
  
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form noValidate className="space-y-5" method="POST" onSubmit={handleSubmit(onSubmit)}>
  
  
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                My Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email", { required:'email required',  pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: 'Invalid email syntax'
                    }})}
                  type="email"
                  defaultValue={userdatas?.email}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium leading-6 text-white">
                My Image
              </label>
              <div className="mt-2">
                <input
                  id="image"
                  {...register("image")}
                  type="file"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e:any) => setimage(e.target.files[0])}
                />
              </div>
              {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
            </div>
            <div>
              <div className="mt-2">
                <Image className='h-[100px] w-[150px]' src={`/user/${userdatas?.image}`} alt="No Image Found" height={200} width={200}  priority/>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update Profile
              </button>
              {loading && <p className='text-red-600 text-center'>processing...</p>}  
            {errmsg && <p className='text-red-600 text-center'>{errmsg}</p>}
            </div>
          </form>
        </div>
        </div>
    }
  </>
  )
}

