import Image from "next/image";
import React from "react";

export const SkeletonOne = () => (
  <div className="w-full h-full">
    <Image
      layout="fill"
      objectFit="cover"
      src="/images/landing/landingVenue1.jpg"
      alt="venues"
    />
  </div>
);

export const SkeletonTwo = () => (
  <div className="object-none w-full h-full">
    <Image
      layout="fill"
      objectFit="cover"
      src="/images/landing/landingCater1.jpg"
      alt="caterers"
    />
  </div>
);

export const SkeletonThree = () => (
  <div className="w-full h-full">
    <Image
      layout="fill"
      objectFit="cover"
      src="/images/landing/landingFlorist3.jpg"
      alt="florists"
    />
  </div>
);

export const SkeletonFour = () => (
  <div className="w-full h-full">
    <Image
      layout="fill"
      objectFit="cover"
      src="/images/landing/landingPhotographer3.jpg"
      alt="photographers"
    />
  </div>
);

export const SkeletonFive = () => (
  <div className="w-full h-full">
    <Image
      layout="fill"
      objectFit="cover"
      src="/images/landing/landingWeddingPlanners1.jpg"
      alt="wedding planners"
    />
  </div>
);
