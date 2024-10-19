"use client";

import { Camera, ChefHat, Flower2, Gem, MapPin } from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";

import Lenis from "@studio-freight/lenis";

import { Footer } from "@/components/custom/Footer";

import {
  BentoGrid,
  BentoGridItem,
} from "@/features/landing/components/BentoGrid";
import CardFiller from "@/features/landing/components/CardFiller";
import LandingCardSection from "@/features/landing/components/LandingCardSection";
import { LandingVideoLoop } from "@/features/landing/components/LandingVideoLoop";
import {
  SkeletonFive,
  SkeletonFour,
  SkeletonOne,
  SkeletonThree,
  SkeletonTwo,
} from "@/features/landing/components/SkeletonComponents";
import { TryAiSection } from "@/features/landing/components/TryAISection";
import { LandingNavBarNew } from "@/features/navbar/components/LandingNavBarNew";

const items = [
  {
    title: "Venues",
    description: "Find the venue that bring it all to life.",
    header: <SkeletonOne />,
    icon: <MapPin className="h-4 w-4 text-black" />,
    link: "/vendors/venues",
  },
  {
    title: "Caterers",
    description:
      "Discover the caterer that transforms your wedding into a culinary masterpiece.",
    header: <SkeletonTwo />,
    icon: <ChefHat className="h-4 w-4 text-black" />,
    link: "/vendors/catering",
  },
  {
    title: "Florists",
    description: "Bloom into your dream wedding with the perfect florist.",
    header: <SkeletonThree />,
    icon: <Flower2 className="h-4 w-4 text-black" />,
    link: "/vendors/favours",
  },
  {
    title: "Wedding Planners",
    description:
      "Find the perfect wedding planner to bring your dream day to life with ease and elegance.",
    header: <SkeletonFive />,
    icon: <Gem className="h-4 w-4 text-text-black" />,
    link: "/vendors/planners",
  },
  {
    title: "Photographers",
    description: "Capture every magical moment with the perfect photographer.",
    header: <SkeletonFour />,
    icon: <Camera className="h-4 w-4 text-black" />,
    link: "/vendors/photographers",
  },
];

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });

  return (
    <div>
      <main className="flex min-h-screen flex-col items-center w-full">
        <LandingNavBarNew />
        <LandingVideoLoop />

        {/* Intro to Jouvire section */}
        <div className="flex flex-col items-center w-full">
          <div className="flex flex-col md:flex-row items-center justify-center w-full">
            <div className="md:w-2/5 flex items-center justify-center">
              <div className="max-w-md text-center md:text-left md:ml-4 lg:ml-2">
                <div className="flex md:mb-2 md:ml-4 justify-center mt-8 md:mt-0 md:justify-normal">
                  <Image
                    priority
                    src="/jouvire.svg"
                    alt="jouvire"
                    width={200}
                    height={100}
                    className=""
                  />
                </div>

                <p className="mx-4 md:mx-0 font-worksans italic text-sm md:text-md font-normal leading-relaxed sm:px-5 md:px-4">
                  Your ultimate destination for all things wedding-related. At
                  Jouvire, we offer a comprehensive guide to planning the
                  perfect wedding, from choosing the ideal venue and finding the
                  best vendors to selecting your dream dress and crafting the
                  perfect ceremony. Let Jouvire be your trusted companion on the
                  journey to your dream wedding.
                </p>
              </div>
            </div>

            <div className="md:w-3/5">
              <BentoGrid className="max-w-4xl mx-auto">
                {items.map((item, i) => (
                  <BentoGridItem
                    key={item.title}
                    title={item.title}
                    description={item.description}
                    header={item.header}
                    icon={item.icon}
                    link={item.link}
                    className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                  />
                ))}
              </BentoGrid>
            </div>
          </div>
        </div>

        {/* CardFiller Section */}
        <div className="relative w-full">
          <div className="md:w-2/5 flex items-center justify-center">
            <div className="max-w-md text-center md:text-left">
              <div className="flex md:mb-2 md:ml-8 justify-center mt-8 md:mt-0 md:justify-normal lg:ml-2">
                <span className="text-lunaPink font-vollkorn text-5xl italic">
                  From inspiration to celebration
                </span>
              </div>
            </div>
          </div>

          <CardFiller />
        </div>

        {/* Landing Card Section */}
        <LandingCardSection />

        {/* AI Planner Section */}
        <TryAiSection />
        <Footer />
      </main>
    </div>
  );
}
