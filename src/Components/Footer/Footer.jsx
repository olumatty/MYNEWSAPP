import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <div className='h-12 px-10 flex text-sm items-center justify-between'>
      <div> @2024 Olumatty. All rights reserved.</div>
      <div className='flex items-center gap-3'>
        <Image src="/1.png" width={15} height={15} className="opacity-[0.6]" alt= "FacebookIcon"/>
        <Image src="/2.png" width={15} height={15} className="opacity-[0.6]" alt= "InstagramIcon"/>
        <Image src="/3.png" width={15} height={15}  className="opacity-[0.6]" alt= "Twitter Icon"/>
        <Image src="/4.png" width={15} height={15}  className="opacity-[0.6]" alt= "YoutubeIcon"/>
        

      </div>
      
    </div>
  )
}

export default Footer
