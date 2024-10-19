"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";

import AuthPopup from "../popups/AuthPopup";
import { hideAuthPopup, isAuthPopupOpen } from "../state/authSlice";

const AuthPopupComponent = () => {
  const dispatch = useDispatch();
  const openAuthPopup = useSelector(isAuthPopupOpen);

  return (
    <AuthPopup
      openAuthPopup={openAuthPopup}
      setOpenAuthPopup={() => dispatch(hideAuthPopup())}
    />
  );
};

export default AuthPopupComponent;
