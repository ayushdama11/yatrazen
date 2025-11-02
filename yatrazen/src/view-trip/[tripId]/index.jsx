import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getTripById } from '../../service/BackendApi';
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';

function Viewtrip () {
    const {tripId} = useParams();
    const [trip, setTrip] = useState();

    // runs whenevr tripId changes
    // if tripId exists it calls GetTripData function to get the trip data
    useEffect(()=>{
        tripId && GetTripData();
    },[tripId])

    // function to get the trip data from backend
    const GetTripData = async() => {
      try {
        const tripData = await getTripById(tripId);
        if (tripData) {
          console.log("Trip data:", tripData);
          setTrip(tripData);
        } else {
          console.log("No trip found");
          toast('No trip found');
        }
      } catch (error) {
        console.error("Error fetching trip:", error);
        toast('Error loading trip. Please try again.');
      }
    }

    
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56 w-screen'> 
        {/* Information section */}
        <InfoSection trip = {trip} />

        {/* Recommended Hotels */}
        <Hotels trip = {trip} />

        {/* Daily plan */}
        <PlacesToVisit trip = {trip} />

     </div>
  )
}

export default Viewtrip