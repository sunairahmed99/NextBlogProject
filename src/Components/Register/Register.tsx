"use client"
import { registerUser, userdata } from '@/redux/Slice/UserSlice';
import { AppDispatch } from '@/redux/store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';

type Inputs = {
    name: string,
    email: string,
    image:FileList,
    password:string,
    cpassword:string,
  };

export default function Register() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const dispatch = useDispatch<AppDispatch>()
    const route = useRouter()
    const {errmsg} = useSelector(userdata)
    let password = watch('password')

    const onSubmit: SubmitHandler<Inputs> = async data =>{
      let formData = new FormData()
      formData.append('name',data.name)
      formData.append('email',data.email)
      formData.append('image',data.image[0])
      formData.append('password',data.password)
      const check = await dispatch(registerUser(formData))

      if(check.type === 'users/register/fulfilled'){
        route.push('/')
      } 
      
    }

    useEffect(() => {
      let token = localStorage.getItem('token')
      if(token){
       route.push('/')
      }
 }, [route]);
 



  return (
    <>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
       
        <h2 className="mt-1 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Register your account
        </h2>
      </div>

      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
        <form noValidate className="space-y-5" method="POST"  onSubmit={handleSubmit(onSubmit)}>

        <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-white">
              Your Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                {...register("name", { required:'name required'})}
                type="text"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
              Your Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                {...register("email", { required:'email required',  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Invalid email syntax'
                  }})}
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium leading-6 text-white">
              Your Image
            </label>
            <div className="mt-2">
              <input
                id="image"
                {...register("image")}
                type="file"
                required
                className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>


          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                Password
              </label>
              
            </div>
            <div className="mt-2">
              <input
                id="password"
                {...register("password", { required:'password required', minLength:6, maxLength:15})}
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
            {errors.password && errors.password.type === 'minLength' && <p className='text-red-500'>Password greater than 5</p>}
            {errors.password && errors.password.type === 'maxLength' && <p className='text-red-500'>Password less than 15</p>}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="cpassword" className="block text-sm font-medium leading-6 text-white">
                Conform Password
              </label>
              
            </div>
            <div className="mt-2">
              <input
                id="cpassword"
                {...register("cpassword", { required:'cpassword required',validate: value => value === password, minLength:6, maxLength:15})}
                type="password"
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {errors.cpassword && <p className='text-red-500'>{errors.cpassword.message}</p>}
            {errors.cpassword && errors.cpassword.type === 'validate' && <p className='text-red-500'>Password not match</p>}
          </div>
          {errmsg && <p className='text-red-500 text-center'>{errmsg}</p>}

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-3 text-center text-sm text-white">
          Already a member?{' '}
          <Link href={'/login'} className="font-semibold leading-6 text-black hover:text-indigo-500">
            Go to login page
          </Link>
        </p>
      </div>
    </div>
  </>
  )
}
