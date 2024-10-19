"use client";

import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

import { environmentConfig } from "@/environments/config";

const Banner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isBannerDismissed = localStorage.getItem("bannerDismissed");
    if (isBannerDismissed) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("bannerDismissed", "true");
  };

  return isVisible ? (
    <div className="bg-lunaPink text-white flex gap-2 items-center p-3 text-sm transition-transform duration-500">
      <div>Are you a wedding vendor?</div>
      <a
        target="_blank"
        href={environmentConfig.vendorSignUpUrl}
        className="text-white hover:text-gray-300 underline"
      >
        Jouvire for vendors
      </a>
      <button
        type="button"
        className="ml-auto text-white hover:text-gray-300"
        onClick={handleDismiss}
      >
        <X className="w-5" />
      </button>
    </div>
  ) : null;
};

export default Banner;
