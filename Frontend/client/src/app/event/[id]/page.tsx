'use client';

import { Button } from '@/components/ui/button';
import { fetchEventById, handleSave } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useState } from 'react';


const EventDetailPage = () => {
  const { id } = useParams();
  const [isSaved, setIsSaved] = useState(false)

  const { data: event, isLoading, isError } = useQuery({
    queryKey: ['event', id],
    queryFn: () => fetchEventById(id as string),
    enabled: !!id,
  });
  const handleSavedFunction = async () => {
    const res = await handleSave(event._id)
    setIsSaved(()=>!isSaved)
  }

  if (isLoading) return <p>Loading event...</p>;
  if (isError) return <p>Failed to load event.</p>;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <img src={event.bannerImage} alt={event.title} className="w-full h-[300px] object-cover rounded" />
      <h1 className="text-3xl font-bold mt-4">{event.title}</h1>
      <p className="text-sm text-gray-500">{event.location}</p>
      <p className="text-sm text-gray-400">{new Date(event.startDate).toDateString()}</p>
      <p className="mt-4 text-lg">{event.description}</p>
      <Button onClick={handleSavedFunction} className='cursor-pointer flex gap-3'>
  {event.saves.length}{isSaved ? 'Unsave' : 'Save'}
</Button>
    </div>
  );
};

export default EventDetailPage;
