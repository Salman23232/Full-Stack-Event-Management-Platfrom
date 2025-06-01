'use client'
import { useAuth } from '@/utils/authStore'

const DebugUser = () => {
  const { user } = useAuth();

  console.log("Current Zustand user:", user);

  return (
    <div className="text-black">
      <p>Debug User: {user?.username || 'Not Logged In'}</p>
    </div>
  );
};

export default DebugUser;
