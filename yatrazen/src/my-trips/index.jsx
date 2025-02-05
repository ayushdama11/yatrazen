import React, { useEffect } from 'react'
import { useNavigate, useNavigation } from 'react-router-dom';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../service/firebaseConfig';
import { Query } from 'firebase/firestore';
import { query } from 'firebase/firestore';
import { where } from 'firebase/firestore';
import { useState } from 'react';
import UserTripCardItem from './components/UserTripCardItem';

const querySnapshot = await getDocs(collection(db, "cities"));
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});

function MyTrips() {
  const navigation = useNavigation();
  const [userTrips, setUserTrips] = useState([]);
  useEffect(()=>{
    GetUserTrips();
  },[])

  // used to get all the trips 
  const GetUserTrips = async()=>{
    const user = JSON.parse(localStorage.getItem('user'));
    if(!user) {
      navigation('/');
      return;
    }
    // if user exists than fetch the trips
    const q = query(collection(db, 'AITrips'), where('userEmail','==',user?.email));
    const querySnapshot = await getDocs(q);
    setUserTrips([]);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setUserTrips(prevVal=>[...prevVal, doc.data()])
    });
  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10 items-center w-screen'>
      <h2 className='font-bold text-3xl'>My Trips</h2>
      <div>
      <div className='grid grid-cols-2 mt-5 md:grid-cols-3 gap-5 object-cover'>
        {userTrips.length>0 ? userTrips.map((trip, index) => (
          <UserTripCardItem key={index} trip={trip}/>
        ))
        :[1,2,3,4,5,6].map((item, index)=>(
          <div key={index} className='h-[200px] w-full bg-slate-200 animate-pulse rounded-xl'>
            
          </div>
        ))
      }
      </div>

      </div>
    </div>
  )
}

export default MyTrips