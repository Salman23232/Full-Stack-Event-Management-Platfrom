'use client'
import api from "@/lib/axios";
import { useAuth } from "@/utils/authStore";
import { constants } from "buffer";
import { useEffect, useState } from "react";

export default function SavedEvents() {
  const [events, setEvents] = useState<any[]>([]);
  const {user, setUser} = useAuth()
  const [loading, setLoading] = useState(true);

  useEffect(() => {

        
        setEvents(user.saves)
    
  }, []);

  if (loading) return <p className="text-center mt-4">Loading saved events...</p>;
  if (events.length === 0) return <p className="text-center mt-4">No saved events.</p>;

  return (
    <div className="mt-10 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Your Saved Events</h2>
      <div className="grid gap-4">
        {events.map((event) => (
          <div key={event._id} className="border p-4 rounded-lg shadow hover:shadow-md transition">
            <h3 className="font-bold text-lg">{event.title}</h3>
            <p className="text-sm text-gray-600">{event.date}</p>
            <p>{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
