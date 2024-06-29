'use client'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Logout() {
    const route = useRouter()


    useEffect(()=>{

        const delcookie =async ()=>{
            try{
                
                await axios.delete(`http://localhost:3000/api/Logout`)
                localStorage.removeItem('token')
                route.push('/')
                
            }catch(err){
                return err
            }
        }
        delcookie()

    },[route])


  return (
    <div></div>
  )
}
