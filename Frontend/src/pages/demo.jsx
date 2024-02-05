import React from 'react'
import { AiOutlineForm } from 'react-icons/ai'
import { useSelector } from 'react-redux'

export default function demo() {
    const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
    <img
        className='rounded-full h-27 w-27 object-cover cursor-pointer self-center mt-2'
        src={currentUser.user.avatar}
        alt="Profile"
        referrerPolicy='no-referrer'
    />
    <AiOutlineForm className='position:absolute bottom-1 right-1 bg-white round text-lg'
    />
</div>
  )
}
