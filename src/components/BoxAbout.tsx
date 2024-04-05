import React from 'react'
type BoxAboutProops = {
    title: string;
    desc: string;
    img: string
}
const BoxAbout = ({title, desc, img}: BoxAboutProops) => {
  return (
    <div className='flex flex-col px-7 py-5 items-center bg-white w-[350px] 
    h-[350px] rounded-xl justify-between md:hover:shadow-xl md:border-none border-2 border-blue-100 transition-all duration-300'>
        <img src={img} className='w-32 h-32' />
      <div className="flex flex-col items-center gap-3">
      <h2 className='text-xl font-bold'>{title}</h2>
      <p className='text-base text-center'>{desc}</p>
      </div>
    </div>
  )
}

export default BoxAbout
