import React from 'react'

const CardReview = ({review}) => {
  return (
    <div className='h-[140px] p-3 rounded-lg shadow-md min-w-[85%] flex flex-col gap-3'>
      <div className="flex justify-between w-full">
        <p className='font-semibold text-lg'>{review.rating}<span className='text-xs text-miniText'>/5</span> </p>
        <p className='text-sm text-miniText'>23 Des 2023</p>
      </div>
      <h4 className='font-semibold'>{review.users.fullname}</h4>
      <p className='text-xs text-miniText line-clamp-2'>{review.text}</p>
    </div>
  )
}

export default CardReview
