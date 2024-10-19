"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { showAuthPopup } from "@/features/auth/state/authSlice";
import {
  handleVendorId,
  isLoggedIn,
  userInfoState,
} from "@/features/auth/state/userInfoSlice";
import ToastBuilder from "@/features/notifications/ToastBuilder";
import type { BaseVendor } from "@/features/vendors/types/vendor.types";

import {
  type ModifyVendorArrayResponse,
  useAddUserVendorArrayMutation,
  useDeleteUserVendorArrayMutation,
  type UserVendorArrayRequest,
} from "@/services/userAPI";

interface UserVendorArrayResponse {
  data?: ModifyVendorArrayResponse;
  error?: FetchBaseQueryError | SerializedError;
}

interface UseVendorLikeProps {
  vendorData: BaseVendor;
}

export const isAddVendorSuccessful = (
  response: UserVendorArrayResponse,
  action: string,
  vendorName: string,
  id: string,
) => {
  if (!("data" in response) || response.data?.result[id] !== action) {
    ToastBuilder.error(
      `Failed to ${
        action === "Added" ? "add to" : "remove from"
      } your liked vendors: ${vendorName}. Please try again later.`,
    ).send();
    return false;
  }
  ToastBuilder.success(
    `${
      action === "Added" ? "Added to" : "Removed from"
    } your liked vendors: ${vendorName}`,
  ).send();
  return true;
};

export const handleLikeAction = ({
  requestBody,
  action,
}: {
  requestBody: UserVendorArrayRequest;
  action: "Deleted" | "Added";
}) => {};

const useVendorLike = ({ vendorData }: UseVendorLikeProps) => {
  const dispatch = useDispatch();
  const [isLikedState, setIsLikedState] = useState(false);
  const [triggerAddUserVendorArrayMutation] = useAddUserVendorArrayMutation();
  const [triggerDeleteUserVendorArrayMutation] =
    useDeleteUserVendorArrayMutation();
  const loggedIn = useSelector(isLoggedIn);
  const userInfo = useSelector(userInfoState);

  useEffect(() => {
    if (userInfo && userInfo.myVendorIds?.includes(vendorData.id.toString())) {
      setIsLikedState(true);
    } else {
      setIsLikedState(false);
    }
  }, [vendorData.id, userInfo]);

  const pressLikeButton = async () => {
    if (!loggedIn) {
      dispatch(showAuthPopup());
      return;
    }

    const requestBody: UserVendorArrayRequest = {
      id: userInfo.userId,
      my_vendors_id: [vendorData.id.toString()],
      email: userInfo.email,
      name: userInfo.username ?? "",
      firebaseId: userInfo.firebaseId,
    };

    handleLikeAction({ requestBody, action: "Deleted" });

    let response;
    let action: "Deleted" | "Added";

    if (isLikedState) {
      response = await triggerDeleteUserVendorArrayMutation(requestBody);
      action = "Deleted";
    } else {
      response = await triggerAddUserVendorArrayMutation(requestBody);
      action = "Added";
    }

    if (
      !isAddVendorSuccessful(
        response,
        action,
        vendorData.name,
        vendorData.id.toString(),
      )
    ) {
      return;
    }

    dispatch(handleVendorId({ id: vendorData.id.toString(), action }));

    setIsLikedState(!isLikedState);
  };

  return {
    isLiked: isLikedState,
    pressLikeButton,
  };
};

export default useVendorLike;
