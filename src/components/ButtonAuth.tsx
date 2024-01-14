import React, { MouseEventHandler } from 'react'


const ButtonAuth = ({label, disabled}) => {
  return (
    <button disabled={disabled} type='submit' 
    className={`flex flex-col py-2 cursor-pointer items-center
     w-full rounded-lg ${disabled ? "bg-blue-300" : "bg-primary"} px-8 gap-2`}>
      <span className='text-lg font-semibold text-white'>{label}</span>
    </button>
  )
}

export default ButtonAuth
