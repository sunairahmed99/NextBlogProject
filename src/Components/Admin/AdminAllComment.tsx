"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getUser, userdata } from '@/redux/Slice/UserSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/redux/store'

interface userdata{
    comment:string,
    _id:string,
    userid:{
        name:string
    },
    blogid:{
        name:string
    },
}

export default function AdminAllComment(){
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

            let response = await axios.get('http://localhost:3000/api/Comment')
            setdatas(response.data.data)
        }catch(err){
            return err
        }
    }

    const deldata =async (id:any)=>{
        try{

            await axios.delete(`http://localhost:3000/api/Comment/${id}`)

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
        <h1 className='text-center text-white py-4 font-bold text-xl'>ALL Comment</h1>
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-white uppercase bg-blue-700 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">
          S.No
        </th>
        <th scope="col" className="px-6 py-3">
          Comment
        </th>
        <th scope="col" className="px-6 py-3">
          User Name
        </th>
        <th scope="col" className="px-6 py-3">
          Blog Name
        </th>
        <th scope="col" className="px-6 py-3">
          Delete
        </th>
      </tr>
    </thead>
    <tbody>
        {
            getdatas.map((cmnt:userdata,index)=>{
                return(
                    <tr key={index} className="bg-blue-700 border-b dark:bg-gray-800 dark:border-gray-700">
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white"
                    >
                      {index}
                    </td>
                    <td className=" text-white px-6 py-4">{cmnt.comment}</td>
                    <td className=" text-white px-6 py-4">{cmnt?.userid?.name}</td>
                    <td className=" text-white px-6 py-4">{cmnt?.blogid?.name}</td>
                    <td onClick={e => deldatas(e,cmnt._id)} className=" text-white px-6 py-4">Delete</td>
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
