import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { PHOTO_REF_URL } from '../../service/GlobalApi';
import { GetPlaceDetails } from '../../service/GlobalApi';

function HotelCardItem({hotel}) {

    const [PhotoUrl, setPhotoUrl] = useState();
      const GetPlacePhoto = async () => {
        const data = {
          textQuery: hotel?.hotelName 
        };
        
        const result = await GetPlaceDetails(data).then(resp=>{
          console.log(resp.data.places[0].photos[0].name);
          const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[0].name);
          setPhotoUrl(PhotoUrl);
        }).catch(error => {
          console.error("Error fetching place details:", error);
        });
      };
      
      useEffect(() => {   
        hotel && GetPlacePhoto();
      }, [hotel]);

  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel.hotelName + "," + hotel?.hotelAddress} target='_blank' className="text-black no-underline">
        <div className='hover:scale-105 transition-all cursor-pointer text-black'>
            <img src= {PhotoUrl ? PhotoUrl : 'https://placehold.co/300x300'} className='rounded-xl h-[200px] w-full object-cover' />
            <div className='my-5 flex flex-col gap-2'>
                <h2 className='font-bold'>{hotel?.hotelName}</h2>
                <h2 className='text-xs text-gray-500 font-medium'>📍 {hotel?.hotelAddress}</h2>
                <h2 className='text-sm font-medium'>💰 {hotel?.price}</h2>
                <h2 className='text-sm font-medium'>⭐ {hotel?.rating} stars</h2>
            </div>
        </div>
    </Link>
  )
}

export default HotelCardItem