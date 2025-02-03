import React from 'react'

function HotelCardItem() {
  return (
    <div key={index} className='hover:scale-105 transition-all cursor-pointer text-black'>
        <img src="https://placehold.co/300x200" className='rounded-xl' />
        <div className='my-5 flex flex-col gap-2'>
        <h2 className='font-bold'>{hotel?.hotelName}</h2>
        <h2 className='text-xs text-gray-500 font-medium'>📍 {hotel?.hotelAddress}</h2>
        <h2 className='text-sm font-medium'>💰 {hotel?.price}</h2>
        <h2 className='text-sm font-medium'>⭐ {hotel?.rating} stars</h2>
        </div>
    </div>
  )
}

export default HotelCardItem