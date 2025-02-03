import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button'
import { IoIosSend } from "react-icons/io";
import { GetPlaceDetails } from '../../service/GlobalApi';
import axios from "axios"

const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=' + import.meta.env.VITE_GOOGLE_PLACE_API_KEY

function InfoSection({ trip }) {

  const [PhotoUrl, setPhotoUrl] = useState();
  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label 
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
    trip && GetPlacePhoto();
  }, [trip]);
  

  return (
    <div>
      <img 
        src= {PhotoUrl} 
        alt="Trip Image" 
        className='h-[340px] w-full object-cover rounded-xl'
      />

      <div className='flex justify-between items-center'>
        <div className='my-5 flex flex-col gap-2'>
          <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
          <div className='hidden sm:flex gap-5'>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 font-bold text-xs md:text-md'>📅 {trip?.userSelection?.noOfDays} Day</h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 font-bold text-xs md:text-md'>💰 {trip?.userSelection?.budget} Budget</h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 font-bold text-xs md:text-md'>🥂 No. Of Travelers: {trip?.userSelection?.traveler} </h2>
          </div>
        </div>
        <Button><IoIosSend /></Button>
      </div>
    </div>
  );
}

export default InfoSection;
