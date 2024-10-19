"use client";

// useAuth.ts
import type { User } from "firebase/auth";
import { useEffect, useState } from "react";

import { onAuthStateChange } from "./authService";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return unsubscribe; // Cleanup on unmount
  }, []);

  return user;
};
