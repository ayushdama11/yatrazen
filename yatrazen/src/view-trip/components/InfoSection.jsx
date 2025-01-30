import React from 'react';

function InfoSection({ trip }) {
  return (
    <div>
      <img 
        src="https://placehold.co/300x200" 
        alt="Trip Image" 
        className='h-[340px] w-full object-cover rounded-xl'
      />

      <div className='my-5 flex flex-col gap-2'>
        <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
        <div>
          <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm'>{trip?.userSelection?.noOfDays} Day</h2>
          <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm'>{trip?.userSelection?.noOfDays} Day</h2>
          <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm'>{trip?.userSelection?.noOfDays} Day</h2>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
