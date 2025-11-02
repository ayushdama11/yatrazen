import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserTrips } from '../service/BackendApi';
import { toast } from 'sonner';
import UserTripCardItem from './components/UserTripCardItem';

function MyTrips() {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);
  
  useEffect(() => {
    GetUserTrips();
  }, []);

  // Used to get all the trips for the logged-in user
  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/');
      return;
    }

    try {
      const trips = await getUserTrips(user.email);
      setUserTrips(trips);
    } catch (error) {
      console.error("Error fetching trips:", error);
      toast('Error loading trips. Please try again.');
    }
  };

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10 items-center w-screen'>
      <h2 className='font-bold text-3xl'>My Trips</h2>
      <div>
        <div className='grid grid-cols-2 mt-5 md:grid-cols-3 gap-5 object-cover'>
          {userTrips.length > 0 ? userTrips.map((trip, index) => (
            <UserTripCardItem key={index} trip={trip} />
          )) : [1, 2, 3, 4, 5, 6].map((item, index) => (
            <div key={index} className='h-[200px] w-full bg-slate-200 animate-pulse rounded-xl'>
              {/* Placeholder skeleton for loading */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyTrips;
