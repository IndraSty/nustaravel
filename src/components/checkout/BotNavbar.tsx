import React from 'react'

const BotNavbar = ({price, onClick}) => {
  return (
    <div className='fixed bottom-0 px-5 py-4 z-[45] rounded-t-lg w-full shadow-top bg-white overflow-hidden'>
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
            <p className='text-sm font-semibold'>Total</p>
            <h1 className='font-bold text-red-400'>IDR {new Intl.NumberFormat('id-ID').format(price)}</h1>
        </div>
        <button onClick={onClick} className='py-3 px-5 font-medium text-white bg-primary rounded-lg'>
            Lanjutkan
        </button>
      </div>
    </div>
  )
}

export default BotNavbar
