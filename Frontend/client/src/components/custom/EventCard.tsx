'use client';


import React from 'react';
import { useRouter } from 'next/navigation';
import { Event } from '@/types';


const EventCard = ({ event }: { event: Event }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/event/${event._id}`)}
      className="cursor-pointer bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
    >
      <img
        src={event.bannerImage}
        alt={event.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{event.title}</h3>
        <p className="text-sm text-gray-600">{event.location}</p>
        <p className="text-sm text-gray-500">
          {new Date(event.startDate).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default EventCard;
