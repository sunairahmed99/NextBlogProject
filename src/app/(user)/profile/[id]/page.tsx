import Navbar from '@/Components/Navbar'
import Profile from '@/Components/profile/Profile'
import ProfileEdit from '@/Components/profile/ProfileEdit'
import React from 'react'

export default function page() {
  return (
    <div>
        <Navbar></Navbar> 
        <ProfileEdit></ProfileEdit>
    </div>
  )
}
