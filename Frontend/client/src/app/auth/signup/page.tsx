"use client";

import React, { ChangeEvent, useRef, useState } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import api from '@/lib/axios';

const SignupPage = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = () => {
    const file = fileRef.current?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const file = fileRef.current?.files?.[0];
    if (!file) {
      toast.error("Please select a profile image");
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append("username", formData.username); // match backend field
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("image", file);

    try {
      await api.post("/auth/signup", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Signup successful");
      router.push("/auth/login");
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
          <div className='pr-10 max-w-[20vw]'>
            <input
              type="file"
              accept="image/*"
              ref={fileRef}
              onChange={handleFileChange}
              className="w-full mb-2"
            />

            {preview && (
              <img
                src={preview}
                alt="preview"
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
            )}

            <h1 className="text-start mb-6 text-2xl font-light">Sign up</h1>
            <p className='font-light mb-8 text-gray-400 text-[12px]'>
              Welcome to Eventonio, an event managing platform to find events happening near you.
              Register as a member for free.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="username"
                placeholder="Username"
                onChange={handleChange}
                value={formData.username}
                className="w-full bg-white text-black p-2 rounded"
              />
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
