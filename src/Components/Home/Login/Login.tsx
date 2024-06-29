"use client"
import { loginUser, userdata } from '@/redux/Slice/UserSlice';
import { AppDispatch } from '@/redux/store';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';

type Inputs = {
    name: string,
    email: string,
    image:string,
    password:string,
    cpassword:string,
  };

export default function Login() {
    const {register, handleSubmit,formState: { errors } } = useForm<Inputs>();
    const dispatch = useDispatch<AppDispatch>()
    const route = useRouter()
    const{errmsg,user,status} = useSelector(userdata)
    

    const onSubmit: SubmitHandler<Inputs> =async data =>{
        const check = await dispatch(loginUser(data))

        if(check.type === 'users/login/fulfilled'){
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
       
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form noValidate className="space-y-5" method="POST" onSubmit={handleSubmit(onSubmit)}>


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
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                Password
              </label>
              <div className="text-sm">
                  <Link href={'/forgotpass'} className="font-semibold text-white hover:text-indigo-500">
                    Forgot password?
                  </Link>
                </div>
              
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
          {errmsg && <p className='text-red-600 text-center'>{errmsg}</p>}

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
          Not a member?{' '}
          <Link href={'/register'} className="font-semibold leading-6 text-black hover:text-indigo-500">
            Register Your Account
          </Link>
        </p>
      </div>
    </div>
  </>
  )
}
