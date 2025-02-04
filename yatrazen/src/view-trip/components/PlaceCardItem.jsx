import React from 'react'
import { Button } from '../../components/ui/ui/button'
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { PHOTO_REF_URL } from '../../service/GlobalApi';
import { GetPlaceDetails } from '../../service/GlobalApi';

function PlaceCardItem({place}) {
  const [PhotoUrl, setPhotoUrl] = useState();
    const GetPlacePhoto = async () => {
      const data = {
        textQuery: place.placeName
      };
      
      const result = await GetPlaceDetails(data).then(resp=>{
        const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[0].name);
        setPhotoUrl(PhotoUrl);
      }).catch(error => {
        console.error("Error fetching place details:", error);
      });
    };
  
  useEffect(() => {   
    place && GetPlacePhoto();
  }, [place]);
  
  return (    
    <Link to={'https://www.google.com/maps/search/?api=1&query='+place.placeName} target='_blank' className="text-black no-underline">
      <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer text-black'>
        <div className='w-[130px] h-[130px] relative flex-shrink-0'>
          <img 
            src={PhotoUrl ? PhotoUrl : 'https://placehold.co/300x300'} 
            alt={place.placeName} 
            className='absolute inset-0 w-full h-full rounded-xl object-cover'
          />
        </div>
        <div>
            <h2 className='font-bold text-lg'>{place.placeName}</h2>
            <p className='text-sm text-gray-500'>{place.placeDetails}</p>
            <h2 className='mt-2 font-medium'>💵 {place.ticketPricing}</h2>
            <Button className='mt-1 bg-red-500' size="sm"><FaMapLocationDot /> Let's Check</Button>
        </div>
      </div>
    </Link>
  )
}

export default PlaceCardItem