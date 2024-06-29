"use client"
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import React, { useEffect} from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { getUser, userdata } from '@/redux/Slice/UserSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/redux/store'

interface Inputs{
    category:string,
    bname:string,
    bdescription:string,
    bimage:string
  };

  interface catInputs{
    category:string,
    _id:string,
  };

export default function AdminHomeBlogupdate(){
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const[getimage,setimage] = React.useState()
    let[getdatas, setdatas] = React.useState<any>()
    let[catdata, setcatdata] = React.useState<any>(null)
    const dispatch = useDispatch<AppDispatch>()
    const {user} = useSelector(userdata)
    const route = useRouter()
    let{id} = useParams() 

    const onSubmit: SubmitHandler<Inputs> =async data =>{

        let formData = new FormData()
        let image = getimage ? getimage : getdatas.image
        let oldimage = getdatas.image
  
        formData.append('name',data.bname)
        formData.append('description',data.bdescription)
        formData.append('image',image)
        formData.append('oldimage',oldimage)
        formData.append('category',data.category)

        UpdateHomeBlog(formData)
      }

    useEffect(()=>{
        // getdata()
        catdatas()
        let token = localStorage.getItem('token')
        if(token){
          dispatch(getUser(token))
        }
    },[dispatch])
    

    const getdata =async ()=>{
        try{

            let response = await axios.get(`http://localhost:3000/api/HomeBlog/${id}`)
            setdatas(response.data.data)
        }catch(err){
            return err
        }
    }

    const catdatas =async ()=>{
        try{

            let response = await axios.get('http://localhost:3000/api/Category/')
            setcatdata(response.data.data)
        }catch(err){
            return err
        }
    }

    const UpdateHomeBlog =async (data:any)=>{
        try{

            let response = await axios.patch(`http://localhost:3000/api/HomeBlog/${id}`,data)
            console.log(response)
            route.push('/Admin/Dashboard_Homeblogsel')

        }catch(err){
            return err
        }
    }

  return (
    <>
    {
        user && user.role === 'admin' &&
        getdatas &&
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
       
        <h2 className="mt-1 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Admin Update HomeBlog 
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
            defaultValue={getdatas.name}
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
                  <option value={getdatas.category._id} >{getdatas?.category.name}</option>  
                {
                        catdata && catdata.map((cat:({name:string, _id:string}),index:any)=>{
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
        <label htmlFor="bdescription" className="block text-sm font-medium leading-6 text-white">
            Blog Description
        </label>
        
        </div>
        <div className="mt-2">
        <input
            id="bdescription"
            {...register("bdescription", { required:'description required'})}
            defaultValue={getdatas.description}
            type="text"
            className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        </div>
        {errors.bdescription && <p className='text-red-500'>{errors.bdescription.message}</p>}
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
            onChange={(e:any) => setimage(e.target.files[0])}
        />
        </div>
        {errors.bimage && <p className='text-red-500'>{errors.bimage.message}</p>}
        </div>

        <div>
        <div className="flex items-center justify-between">        
        </div>
        <div className="mt-2">
        <Image className='h-[100px] w-[250px]' src={`/homeblog/${getdatas.image}`} alt="" height={200} width={200}  priority/>
        </div>
        {errors.bimage && <p className='text-red-500'>{errors.bimage.message}</p>}
        </div>

        <div>
        </div>
        <div>
        <button
        type="submit"
        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
        Update HomeBlog
        </button>
        </div>
        </form>
      </div>
    </div>
    }
    
  </>
  )
}
