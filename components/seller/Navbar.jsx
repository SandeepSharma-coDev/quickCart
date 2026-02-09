import React from 'react'
import { assets, BagIcon, CartIcon } from '../../assets/assets'
import Image from 'next/image'
import { useAppContext } from '@/context/AppContext'
import { UserButton } from '@clerk/nextjs'

const Navbar = () => {

  const { router } = useAppContext()

  return (
    <div className='flex items-center px-4 md:px-8 py-3 justify-between border-b'>
      <Image onClick={()=>router.push('/')} className='w-28 lg:w-32 cursor-pointer' src={assets.logo} alt="" />
       <UserButton>
                  <UserButton.MenuItems>
                    <UserButton.Action label="Cart" labelIcon={<CartIcon />} onClick={()=> router.push("/cart")} />
                  </UserButton.MenuItems>
                   <UserButton.MenuItems>
                    <UserButton.Action label="My Orders" labelIcon={<BagIcon />} onClick={()=> router.push("my-orders")} />
                  </UserButton.MenuItems>
                </UserButton>
    </div>
  )
}

export default Navbar