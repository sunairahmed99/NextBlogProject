"use client"
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { getUser, userdata } from '@/redux/Slice/UserSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/redux/store'

interface userdata{
    name:string,
    email:string,
    role:string,
    _id:string
}

export default function AdminAllUser(){
    let[getdatas, setdatas] = useState<null |[]>()
    const dispatch = useDispatch<AppDispatch>()
    const {user} = useSelector(userdata)


    const deldatas = (e:any,id:string)=>{
        e.preventDefault()
        deldata(id)
        alert('are you sure to delete this')
        getdata()

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

            let response = await axios.get('http://localhost:3000/api/user/alluser')
            setdatas(response.data.data)
        }catch(err){
            return err
        }
    }

    const deldata =async (id:any)=>{
        try{

            await axios.delete(`http://localhost:3000/api/user/alluser/${id}`)

        }catch(err){
            return err
        }
    }


  return (
    <>
    { user && user.role === 'admin' &&
        getdatas &&
        <div className="relative overflow-x-auto">
        <h1 className='text-center text-white py-4 font-bold text-xl'>ALL Users</h1>
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-white uppercase bg-blue-700 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">
          S.No
        </th>
        <th scope="col" className="px-6 py-3">
          Name
        </th>
        <th scope="col" className="px-6 py-3">
          Email
        </th>
        <th scope="col" className="px-6 py-3">
          role
        </th>
        <th scope="col" className="px-6 py-3">
          Delete
        </th>
      </tr>
    </thead>
    <tbody>
        {
            getdatas.map((user:userdata,index)=>{
                return(
                    <tr key={index} className="bg-blue-700 border-b dark:bg-gray-800 dark:border-gray-700">
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white"
                    >
                      {index}
                    </td>
                    <td className=" text-white px-6 py-4">{user.name}</td>
                    <td className=" text-white px-6 py-4">{user.email}</td>
                    <td className=" text-white px-6 py-4">{user.role}</td>
                    <td onClick={e => deldatas(e,user._id)} className=" text-white px-6 py-4">Delete</td>
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
