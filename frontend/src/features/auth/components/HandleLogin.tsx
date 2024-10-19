"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { useAuth } from "@/features/auth/components/useAuth";
import { clear, setInfo } from "@/features/auth/state/userInfoSlice";
import ToastBuilder from "@/features/notifications/ToastBuilder";

import { useLazySendUserDataQuery } from "@/services/userAPI";

import type { ProviderType } from "../state/userInfoSlice";

interface UserInfoResponse {
  message: string;
  data: {
    id: string;
    onboarding: boolean;
    username: string;
    profilePicture: string;
  };
}

interface ErrorResponse {
  error: FetchBaseQueryError | SerializedError;
}

const HandleLogin = () => {
  const pathName = usePathname();
  const router = useRouter();
  const [triggerPostUserInfo] = useLazySendUserDataQuery();
  const user = useAuth();
  const dispatch = useDispatch();

  /**
   * Updates the login status by fetching the user's ID token,
   * sending user information to the backend, and updating the Redux store.
   */
  const updateLoginStatus = async () => {
    if (!user) {
      dispatch(clear()); // Clears the user data
      return;
    }

    const accessToken = await user.getIdToken();
    const providerType = user.providerData[0].providerId;

    const response = await triggerPostUserInfo({
      email: user.email || "",
      firebaseId: user.uid,
      name: "test",
    });

    // If there is an error updating the database
    const userId = response.data?.user.id || "";
    const myVendorIds = response.data?.user.my_vendors_ids || [];

    if (userId === "") {
      ToastBuilder.error("A server error occurred...").send();
    }

    dispatch(
      setInfo({
        isAuthLoading: false,
        isAuthenticated: true,
        access_token: accessToken,
        scope: "",
        onboarded: false,
        email: user.email || "",
        firebaseId: user.uid || "",
        username: "",
        userId: response.data?.user.id || "", // backend userId
        profilePicture: user.photoURL || "",
        providerType: providerType as ProviderType,
        myVendorIds,
      }),
    );
  };

  useEffect(() => {
    updateLoginStatus();
  }, [user]);

  return null;
};

export { HandleLogin };
