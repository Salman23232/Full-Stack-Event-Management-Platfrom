'use client'
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import EventCard from '@/components/custom/EventCard';
import { Event } from '@/types';
import { useEffect } from 'react';

const fetchEvents = async () => {
  const res = await api.get('/event');
  console.log(res.data);
  
  return res.data;

};

const HomePage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });
  useEffect(() => {
    fetchEvents()
  }, [])
  

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {data.map((event:Event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
};

export default HomePage