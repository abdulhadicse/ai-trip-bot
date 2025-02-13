import React from 'react';

const InfoSection = ({trip}) => {
    return (
        <div>
            <img className='h-[400px] w-full object-cover rounded-xl' src="/assets/img/placeholder.avif" alt="placeholder"/>

            <div className='my-5 flex flex-col gap-2'>
                <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
                <div className='flex gap-5 mt-4'>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>📅 {trip?.userSelection?.noOfDays} Days</h2>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>💰 {trip?.userSelection?.budget} Budget</h2>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>🥂 No. of Traveler: {trip?.userSelection?.traveler}</h2>
                </div>
            </div>
        </div>
    );
};

export default InfoSection;