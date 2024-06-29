import Content from '@/Components/Home/Content'
import Hbanner from '@/Components/Home/Hbanner'
import Navbar from '@/Components/Navbar'
import React from 'react'

export default function page() {
  return (
    <div>

      <Navbar></Navbar>
      <Hbanner></Hbanner>
      <Content></Content>
    </div>
  )
}
