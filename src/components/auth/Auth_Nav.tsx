import { MousePointerClick } from 'lucide-react'
import React from 'react'
import ThemeButton from '../ui/theme-toggle'
import Link from 'next/link'
const Auth_Nav = () => {
  return (
    <div className='fixed w-full flex justify-between h-12 items-center'>
    <Link className='flex items-center ml-4 text-sm font-normal cursor-pointer'
    href="/">
        <MousePointerClick className="text-primary " size={23}/>
        <p className="font-semibold pl-1 ">Klickr</p>
    </Link>
    <div className='mr-4'>
    <ThemeButton/>
    </div>
        
</div>
  )
}

export default Auth_Nav