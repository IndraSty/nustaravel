"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaChevronLeft } from 'react-icons/fa'

type NavbarCompProps = {
    title: string,
    desc: string
}

const NavbarComp = ({title, desc}: NavbarCompProps) => {
  const router = useRouter()
  return (
    <div className='fixed flex items-center w-full shadow-sm px-5 py-3 bg-white'>
      <button onClick={() => router.back()} ><FaChevronLeft className="text-base" /></button>
      <div className="flex flex-col px-7 leading-4">
        <h1 className='text-lg font-semibold'>{title}</h1>
        <span className='text-sm text-miniText'>{desc}</span>
      </div>
    </div>
  )
}

export default NavbarComp
