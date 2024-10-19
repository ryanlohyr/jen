import { motion } from "framer-motion";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export const LandingVideoLoop: React.FC = () => {
  const [index, setIndex] = useState(0);
  const videos = [
    "https://jouvirevendors.s3.ap-southeast-1.amazonaws.com/landingPage/Jovire_Web+Test.mp4",
    // "https://jouvirevendors.s3.ap-southeast-1.amazonaws.com/landingPage/landingVideo1.mp4",
    // "https://jouvirevendors.s3.ap-southeast-1.amazonaws.com/landingPage/landingVideo2.mp4",
  ];

  useEffect(() => {
    const handleVideoEnded = () => {
      setIndex((prevIndex) => (prevIndex + 1) % videos.length);
    };

    const videoElement = document.querySelector("video");

    if (videoElement) {
      videoElement.addEventListener("ended", handleVideoEnded);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("ended", handleVideoEnded);
      }
    };
  }, [index, videos.length]);

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <video
        key={videos[index]}
        muted
        autoPlay
        loop
        playsInline
        className="w-full h-full object-cover"
      >
        <source src={videos[index]} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black opacity-50" />
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.0,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center p-4"
      >
        <h1 className="text-white font-vollkorn text-4xl md:text-6xl font-bold mb-4">
          Create Your Dream Wedding
        </h1>
        <div className="w-full max-w-2xl">
          <p className="text-white font-worksans md:text-xl sm:text-sm mb-6 mx-auto px-4 md:px-8 text-center">
            From venues to photographers, Jouvire is your one-stop shop for all
            wedding-related information and pricing in Singapore.
          </p>
        </div>
        <div className="flex space-x-4 mt-6">
          <Link href="/vendors">
            <Button variant="primaryPurple" size="sm" className="bg-lunaPink">
              Get Started
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
