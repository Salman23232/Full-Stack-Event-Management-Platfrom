'use client'

import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import api from "@/lib/axios";
import { useAuth } from "@/utils/authStore";

export default function Profile() {
  const [editingName, setEditingName] = useState(false);
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Rename this function so it doesn't clash with imported or destructured updateUser
  const updateUserData = (data: FormData) => api.put("/user", data);

  // Fetch user data on mount
  useEffect(() => {
    async function fetchUser() {
      const res = await api.get("/user/me");
      setUser(res.data);
      setLoading(false); // Move loading to after data fetched
    }
    fetchUser();
  }, [setUser]);

  const handleNameChange = async () => {
    if (!user?.username) return;
    setUploading(true);

    // Create FormData properly, append name
    const formData = new FormData();
    formData.append("name", user.username);

    await updateUserData(formData);

    setEditingName(false);
    setUploading(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profileImage", file);
    setUploading(true);

    await updateUserData(formData);

    // Re-fetch user data to update state with new profile image url
    const updatedRes = await api.get("/user/me");
    setUser(updatedRes.data);

    setUploading(false);
  };

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow p-6 space-y-6">
      {/* Profile Image */}
      <div className="relative w-32 h-32 mx-auto">
        <img
          src={user?.profilePicture || "/default-avatar.png"}
          alt="Profile"
          className="w-full h-full rounded-full object-cover border-4 border-white shadow-md"
        />
        <label className="absolute bottom-1 right-1 bg-white p-1 rounded-full cursor-pointer shadow">
          <Pencil size={16} />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Username */}
      <div className="text-center flex justify-center items-center gap-2">
        {editingName ? (
          <input
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            onBlur={handleNameChange}
            className="border px-2 py-1 rounded-md text-xl text-center"
            autoFocus
          />
        ) : (
          <>
            <h1 className="text-2xl font-semibold">{user?.username}</h1>
            <button onClick={() => setEditingName(true)}>
              <Pencil size={18} />
            </button>
          </>
        )}
      </div>

      {uploading && <p className="text-center text-blue-500">Updating...</p>}
    </div>
  );
}
