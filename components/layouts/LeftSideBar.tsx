'use client'
import Image from 'next/image'
import React from 'react'
import { navLinks } from '@/lib/constants'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
type Props = {}

function LeftSideBar({}: Props) {
    const pathName=usePathname()
  return (
    <div className='h-screen left-0 top-0 sticky p-10 flex bg-blue-2 flex-col gap-16 shadow-xl max-lg:hidden'>
        <Image className='w-10 h-10' src='/logo.svg' alt='logo' width={100} height={100}/>
        <div className='flex  flex-col gap-10'>
            {   navLinks.map(link => (
                <Link href={link.url} key={link.label} className={`flex flex-row text-body-medium items-center gap- ${pathName===link.url ? "text-blue-1" : "" }`}>
                    {link.icon}
                    <p className=''>{link.label}</p>
                    </Link>
                ))}
                <div className='flex gap-4 text-body-medium items-center '>
<UserButton/>
<p>Edit Profile</p>
                </div>
        </div>
        </div>
  )
}

export default LeftSideBar