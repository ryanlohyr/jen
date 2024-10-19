import React, { useState } from "react";

import LoginPopup from "./Login/LoginPopup";
import SignupPopup from "./Signup/SignupPopup";

interface AuthPopupProps {
  openAuthPopup: boolean;
  setOpenAuthPopup: (open: boolean) => void;
}
const AuthPopup = ({ openAuthPopup, setOpenAuthPopup }: AuthPopupProps) => {
  const [currentAuthPopup, setCurrentAuthPopup] = useState<"login" | "signup">(
    "login",
  );
  return (
    <div>
      <LoginPopup
        openLoginPopup={openAuthPopup && currentAuthPopup === "login"}
        setCurrentAuthPopup={setCurrentAuthPopup}
        setOpenLoginPopup={setOpenAuthPopup}
      />
      <SignupPopup
        openSignUpPopup={openAuthPopup && currentAuthPopup === "signup"}
        setCurrentAuthPopup={setCurrentAuthPopup}
        setOpenSignUpPopup={setOpenAuthPopup}
      />
    </div>
  );
};

export default AuthPopup;
