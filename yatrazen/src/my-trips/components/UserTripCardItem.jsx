import React from 'react'
import { useState, useEffect } from 'react';
import { GetPlaceDetails } from '../../service/GlobalApi';
import { PHOTO_REF_URL } from '../../service/GlobalApi';
import { Link } from 'react-router-dom';

function UserTripCardItem({trip}) {

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
    <Link to={'/view-trip/'+trip?.id}>
        <div className='hover:scale-110 transition-all '>
            <img className='object-cover rounded-xl w-[200px] h-[150px] md:h-[200px] md:w-[300px] ' src={PhotoUrl ? PhotoUrl : "https://placehold.co/300x300"} alt="xyz" />
            <div>
                <h2 className='font-bold text-lg text-black'>{trip?.userSelection?.location?.label}</h2>
                <h2 className='text-sm font-bold text-gray-500'>{trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} Budget</h2>
            </div>
        </div>
    </Link>
  )
}

export default UserTripCardItem