import React from 'react'
import { Button } from '../../components/ui/ui/button'
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function PlaceCardItem({place}) {
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+place.placeName} target='_blank' className="text-black no-underline">
    <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer text-black'>
        <img src="https://placehold.co/300x300" alt="" className='w-[130px] h-[130px] rounded-xl'/>
        <div>
            <h2 className='font-bold text-lg'>{place.placeName}</h2>
            <p className='text-sm text-gray-500'>{place.placeDetails}</p>
            <h2 className='mt-2 font-medium'>🕒{place.travelDuration}</h2>
            <Button className='mt-1 bg-red-500' size="sm"><FaMapLocationDot /> Let's Check</Button>
        </div>
    </div>
    </Link>
  )
}

export default PlaceCardItem