import Image from "next/image";
import React from "react";

const TopSection = () => {
  return (
    <div>
      <div className="relative h-[20vh] md:h-[28vh] w-full flex items-center justify-center overflow-hidden mb-4">
        <div className="absolute top-0 left-0 w-full h-full">
          <Image
            src="/helpTopSection.jpg"
            alt="background image"
            fill
            className="object-cover w-full h-full"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center text-center p-4 text-3xl md:text-5xl">
          <h1 className="text-white font-vollkorn mb-4 mr-3">
            We&apos;re here to
          </h1>
          <h1 className="text-white font-vollkorn font-semibold mb-4">help</h1>
        </div>
      </div>
    </div>
  );
};

export default TopSection;
