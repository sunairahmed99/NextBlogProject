"use client"
import {resetpass, updatepass, userdata } from '@/redux/Slice/UserSlice';
import { AppDispatch } from '@/redux/store';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';

type Inputs = {
    oldpassword:string,
    password:string,
    cpassword:string,
  };

export default function Updatepassword() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const dispatch = useDispatch<AppDispatch>()
    const route = useRouter()
    const{user,errmsg} = useSelector(userdata)
    let password = watch('password')

    const onSubmit: SubmitHandler<Inputs> = async data =>{
        let token = localStorage.getItem('token')
      
      const check = await dispatch(updatepass({data,token}))
      if(check.type === 'users/updatepass/fulfilled'){
        route.push('/')
      } 
    }

  return (
    <>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
       
        <h2 className="mt-1 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Update Password
        </h2>
      </div>

      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
        <form noValidate className="space-y-5" method="POST"  onSubmit={handleSubmit(onSubmit)}>

        <div>
            <div className="flex items-center justify-between">
              <label htmlFor="oldpassword" className="block text-sm font-medium leading-6 text-white">
               Old Password
              </label>
              
            </div>
            <div className="mt-2">
              <input
                id="oldpassword"
                {...register("oldpassword", { required:'old password required', minLength:6, maxLength:15})}
                type="password"
                className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {errors.oldpassword && <p className='text-red-500'>{errors.oldpassword.message}</p>}
            {errors.oldpassword && errors.oldpassword.type === 'minLength' && <p className='text-red-500'>Password greater than 5</p>}
            {errors.oldpassword && errors.oldpassword.type === 'maxLength' && <p className='text-red-500'>Password less than 15</p>}
          </div>

       
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                New Password
              </label>
              
            </div>
            <div className="mt-2">
              <input
                id="password"
                {...register("password", { required:'password required', minLength:6, maxLength:15})}
                type="password"
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
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {errors.cpassword && <p className='text-red-500'>{errors.cpassword.message}</p>}
            {errors.cpassword && errors.cpassword.type === 'validate' && <p className='text-red-500'>Password not match</p>}
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
      {user && <p className='text-red-400 text-center'>{user.data}</p>}
      {errmsg && <p className='text-red-400 text-center'>{errmsg}</p>}
    </div>
  </>
  )
}
