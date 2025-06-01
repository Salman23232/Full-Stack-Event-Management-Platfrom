"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useAuth } from "./authStore";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, hasHydrated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (hasHydrated && !user) {
      router.push("/auth/login");
    }
  }, [user, hasHydrated]);

  if (!hasHydrated) return null; // Wait for hydration

  if (!user) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
