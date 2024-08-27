'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { navLinks } from '@/lib/constants'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'

type Props = {}

const LeftSideBar: React.FC<Props> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathName = usePathname();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className='h-screen left-0 top-0 sticky p-10 flex bg-blue-2 flex-col gap-16 shadow-xl max-lg:hidden'>
      <Image className='w-10 h-10' src='/logo.png' alt='logo' width={100} height={100} />
      <div className='flex flex-col gap-10'>
        {navLinks.map(link => (
          <Link
            href={link.url}
            key={link.label}
            className={`flex flex-row text-body-medium items-center gap-2 ${pathName === link.url ? "text-blue-1" : ""}`}
          >
            {link.icon}
            <p>{link.label}</p>
          </Link>
        ))}
        <div className='flex gap-4 text-body-medium items-center'>
          <UserButton />
          <p>Edit Profile</p>
        </div>
        <button
          onClick={handleOpenModal}
          className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'
        >
          Go Premium
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='relative bg-white p-6 rounded-lg shadow-lg w-80'>
            <button
              onClick={handleCloseModal}
              className='absolute top-2 right-2 text-gray-600 text-5xl hover:text-gray-900'
              aria-label='Close modal'
            >
              &times;
            </button>
            <h2 className='text-xl font-bold mb-4'>Premium Features</h2>
            <ul className='list-disc pl-5 mb-4'>
              <li className='flex items-center gap-2'>
                <span className='text-green-500'>✔</span> Deep insights and analytics
              </li>
              <li className='flex items-center gap-2'>
                <span className='text-green-500'>✔</span> Virtual Exhibitions ; VR, AR, 3D
              </li>
              <li className='flex items-center gap-2'>
                <span className='text-green-500'>✔</span> Promote your Products
              </li>
              <li className='flex items-center gap-2'>
                <span className='text-green-500'>✔</span> Advance Realtime Tracking delivery status
              </li>
            </ul>
            <p className='text-gray-500 badge mb-4'>Coming Soon</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default LeftSideBar
