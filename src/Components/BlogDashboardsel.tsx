"use client"
import Image from 'next/image';
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { userdata } from '@/redux/Slice/UserSlice';

interface blogdata{
    name:string,
    category:{
      name:String
    },
    image:string,
    description:string,
    userid:{
        name:string,
    }
    _id:string
}

export default function BlogDashboardsel(){
    let[getdatas, setdatas] = useState<null |[]>()
    let {user} = useSelector(userdata)

    const deldatas = (e:any,id:string)=>{
        e.preventDefault()
        deldata(id)
        alert('are you sure to delete this')

    }
   

    const deldata =async (id:any)=>{
        try{

            await axios.delete(`http://localhost:3000/api/Blog/${id}`)

        }catch(err){
            return err
        }
    }

    useEffect(()=>{
      const getdata =async ()=>{
        try{
           
          if(user._id){
            console.log(user._id)
            let response = await axios.get(`http://localhost:3000/api/usrblogdashboard/${user._id}`)
            setdatas(response.data.data)

          }
        }catch(err){
            return err
        }
    }
      getdata()
  },[user._id])


  return (
    <>
    {
        getdatas &&
        <div className="relative overflow-x-auto">
        <h1 className='text-center text-white py-4 font-bold text-xl'>ALL Blogs</h1>
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-white uppercase bg-blue-700 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">
          S.No
        </th>
        <th scope="col" className="px-6 py-3">
          User
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
                    <td className=" text-white px-6 py-4">{blog.userid?.name}</td>
                    <td className=" text-white px-6 py-4">{blog.name}</td>
                    <td className=" text-white px-6 py-4">{blog.category.name}</td>
                    <td className=" text-white px-6 py-4"><Image src={blog.image && `/blog/${blog?.image}`} alt="" height={200} width={200}  priority/></td>
                    <td className=" text-white  py-4">{blog.description}</td>
                    <td className=" text-white px-6 py-4"><Link href={`/Dashboard_Blog_update/${blog._id}`}>Edit</Link></td>
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
