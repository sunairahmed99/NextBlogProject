import React from 'react'
import Image from 'next/image';

export default function Hbanner() {
  return (
    <div className='hidden lg:block'>

        <div className='invisible lg:visible grid grid-cols-1 lg:grid-cols-5  mt-[30px] lg:mt-[60px] text-white'>

        <div className='col-span-2'>
        <Image className="h-[220px] w-full lg:h-[320px] lg:w-[450px] border-l-[20px] border-r-[20px] border-b-[20px] border-t-[20px] border-blue-800 rounded-[20px] lg:ml-[150px]" src="/blog5.jpg" alt="image"  width={450}
                    height={220} 
                    priority={false}
                     />
        </div>

        <div className='col-span-3 text-center lg:pr-[50px] mt-[20px] lg:mt-[0px]'>
            <button className="bg-blue-800   hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center">
                Art
            </button>
            <h1 className='font-bold text-[22px] pt-2'>Exploring Creativity: The Diverse Landscape of Artistry.</h1>
            <p className="pt-2 leading-[2.5]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
        </div>
        </div>
    </div>
   
  )
}
