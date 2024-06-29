"use client"
import axios from 'axios'
import Image from 'next/image';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { getUser, userdata } from '@/redux/Slice/UserSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/redux/store'

interface blogdata{
    name:string,
    category:{
      name:String
    },
    image:string,
    description:string,
    _id:string
}

export default function AdminHomeBlogsel(){
    let[getdatas, setdatas] = useState<null |[]>()
    const dispatch = useDispatch<AppDispatch>()
    const {user} = useSelector(userdata)


    const deldatas = (e:any,id:string)=>{
        e.preventDefault()
        deldata(id)
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

            let response = await axios.get('http://localhost:3000/api/HomeBlog')
            setdatas(response.data.data)
        }catch(err){
            return err
        }
    }

    const deldata =async (id:any)=>{
        try{

            await axios.delete(`http://localhost:3000/api/HomeBlog/${id}`)
            alert('are you sure to delete this')
            getdata()

        }catch(err){
            return err
        }
    }


  return (
    <>
    {
      user && user.role === 'admin' &&
        getdatas &&
        <div className="relative overflow-x-auto">
        <h1 className='text-center text-white py-4 font-bold text-xl'>ALL Home Blogs</h1>
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-white uppercase bg-blue-700 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">
          S.No
        </th>
        <th scope="col" className="px-6 py-3">
          Blog Name
        </th>
        <th scope="col" className="px-6 py-3">
          Category Name
        </th>
        <th scope="col" className="px-6 py-3">
          Image
        </th>
        <th scope="col" className="px-[200px] py-3">
          Description
        </th>
        <th scope="col" className="px-6 py-3">
          Edit
        </th>
        <th scope="col" className="px-6 py-3">
          Delete
        </th>
      </tr>
    </thead>
    <tbody>
        {
            getdatas.map((blog:blogdata,index)=>{
                return(
                    <tr key={index} className="bg-blue-700 border-b dark:bg-gray-800 dark:border-gray-700">
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white"
                    >
                      {index}
                    </td>
                    <td className=" text-white px-6 py-4">{blog.name}</td>
                    <td className=" text-white px-6 py-4">{blog.category.name}</td>
                    <td className=" text-white px-6 py-4"><Image src={blog.image && `/homeblog/${blog?.image}`} alt="" height={200} width={200}  priority/></td>
                    <td className=" text-white  py-4">{blog.description}</td>
                    <td className=" text-white px-6 py-4"><Link href={`Dashboard_Homeblog_update/${blog._id}`}>Edit</Link></td>
                    <td onClick={e => deldatas(e,blog._id)} className=" text-white px-6 py-4">Delete</td>
                  </tr>

                )

            })
        }
    </tbody>
  </table>
    </div>
    }
    </>
   
  )
}
