import React from 'react'
import { Link } from 'react-router-dom';

function Hotels({trip}) {
  return (
    <div >
        <h2 className='font-bold text-xl mt-5 mb-2'>Hotel Recommendations</h2>
        
        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
        {trip?.tripdata?.hotelOptions?.map((hotel, index) => (
          <Link key={index} to={'https://www.google.com/maps/search/?api=1&query='+hotel.hotelName + "," + hotel?.hotelAddress} target='_blank' className="text-black no-underline">
          <div key={index} className='hover:scale-105 transition-all cursor-pointer text-black'>
              <img src="https://placehold.co/300x200" className='rounded-xl' />
              <div className='my-5 flex flex-col gap-2'>
                <h2 className='font-bold'>{hotel?.hotelName}</h2>
                <h2 className='text-xs text-gray-500 font-medium'>📍 {hotel?.hotelAddress}</h2>
                <h2 className='text-sm font-medium'>💰 {hotel?.price}</h2>
                <h2 className='text-sm font-medium'>⭐ {hotel?.rating} stars</h2>
              </div>
          </div>
          </Link>
        ))}
        </div> 
    </div>
  )
}

export default Hotels;