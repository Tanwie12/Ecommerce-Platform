'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import { Menu } from 'lucide-react'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import { usePathname } from 'next/navigation'

import {navLinks } from '@/lib/constants'
type Props = {}

function Topbar({}: Props) {
const [isOpen, setIsOpen] = React.useState(false)
const pathName=usePathname()
  return (
    <div className='sticky top-0 z-20 w-full flex justify-between items-center px-8 py-4 b-blue-2 shadow-xl lg:hidden'>
         <Image className='w-10 h-10' src='/logo.png' alt='logo' width={100} height={100}/>
        <div className='flex max-md:hidden  gap-4'>
            {   navLinks.map(link => (
                <Link href={link.url} key={link.label} className={`flex flex-row text-body-medium items-center gap-4 ${pathName===link.url ? "text-blue-1" : "" }`}>
                
                    <p className={``}>{link.label}</p>
                    </Link>
                ))}
                
        </div>
        <div className='flex gap-4 text-body-medium items-center '>
        <Dropdown className=''>
      <DropdownTrigger>
        <Menu size={20} className='md:hidden' />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        
        {navLinks.map(link => (
          <DropdownItem key={link.label} className=''>
            <Link href={link.url} className={`flex flex-row  items-center gap-4 ${pathName===link.url ? "text-blue-1" : "" }`}>
             {link.icon}   <p className=''>{link.label}</p>
            </Link>
          </DropdownItem>
        ))}
        
      </DropdownMenu>
    </Dropdown>
<UserButton/>

                </div>
    </div>
  )
}

export default Topbar
