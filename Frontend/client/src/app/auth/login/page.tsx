"use client";

import React, { ChangeEvent, useRef, useState } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import api from '@/lib/axios';
import { useAuth } from '@/utils/authStore';

const LoginPage = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({

    email: '',
    password: ''
  });
  const {setUser} = useAuth()
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/auth/login", formData)
      if (response) {
        console.log('Login response:', response.data);
        var { _id, username, email, profilePicture, role } = response.data;
setUser({ _id, username, email, profilePicture, role });
        toast.success("Logged in successfully");
      router.push("/");
      }
      
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full min-h-screen bg-gray-300 flex justify-center items-center'>
      <div className="max-w-[80vw] shadow-2xl h-full bg-black mx-auto">
        <div className='flex items-center justify-between gap-10 text-white shadow-2xl'>
          <div>
            <Image src='/signup.png' height={550} width={550} alt='signup image' />
          </div>
            <div className='max-w-[40vh] mr-10'>
              <h1 className="text-start mb-6 text-2xl font-light">Log in</h1>
            <p className='font-light mb-8 text-gray-400 text-[12px]'>
              Welcome Back to Eventonio, an event managing platform to find events happening near you.
              Login to you account.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                value={formData.email}
                className="w-full bg-white text-black p-2 rounded"
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                value={formData.password}
                className="w-full bg-white text-black p-2 rounded"
              />

              <Button
                variant='secondary'
                className='bg-blue-700 w-full text-white'
                type="submit"
              >
                {loading ? 'Submitting...' : 'Submit'}
              </Button>
              <Button onClick={() => setUser({ _id: "1", email: "test@test.com", username: "Test User" ,role:'user',profilePicture:'image'})}>
  Test Set User
</Button>

            </form>
            </div>
          </div>
        </div>
      </div>
    )
};

export default LoginPage;
