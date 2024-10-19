"use client";

import { Nunito } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";

const nunito = Nunito({ subsets: ["latin"] });

const Hero = () => {
  return (
    <div>
      <div className={`bg-primary-foreground font-bold ${nunito.className}`}>
        <div className="flex gap-12 p-12 ">
          <div className="basis-full md:basis-1/2 flex flex-col gap-y-4">
            <h1 className="md:text-[40px] sm:text-[34px] text-[30px]  text-shadow-lg">
              Wedding venues and vendors: Let&apos;s find your (other) perfect
              match
            </h1>
            <ul className="list-disc list-inside">
              <li>
                Discover, inquire with, and book vendors who are right for you
              </li>
              <li>Transparent pricing and vendors for every budget</li>
              <li>Plus, personalized recs to match your style</li>
            </ul>
            <Link href="/chat">
              <Button className="w-[160px]" variant="primaryPurple">
                Take our quiz
              </Button>
            </Link>
          </div>

          <div className="basis-0 md:basis-1/2 flex justify-end">
            <Image
              src="/images/vendors/couples2.jpg"
              alt="Jouvire"
              className="w-full h-full object-cover border rounded-[60px]"
              width={0}
              height={0}
              sizes="(min-width: 980px) 912px, calc(92.73vw + 22px)"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
