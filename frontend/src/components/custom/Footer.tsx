import { Copyright } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FacebookBlack } from "@/components/icons/FacebookBlack";
import { Instagram } from "@/components/icons/Instagram";
import { Linkedin } from "@/components/icons/Linkedin";
import { Tiktok } from "@/components/icons/Tiktok";

import { showAuthPopup } from "@/features/auth/state/authSlice";

export const Footer = () => {
  const dispatch = useDispatch();

  const handleSignIn = () => {
    dispatch(showAuthPopup());
  };

  const planInfo: { [key: string]: string } = {
    Vendors: "/vendors",
    Venues: "/vendors/venues",
    Photographers: "/vendors/photographers",
    Gowns: "/vendors/gowns",
    Florists: "/vendors/favours",
    Caterer: "/vendors/catering",
  };
  const aboutInfo: { [key: string]: string } = {
    "Our story": "/about",
    // Reviews: "#",
  };
  const adviceInfo: { [key: string]: string } = {
    // "Expert advice": "#",
    // FAQs: "#",
    "Contact us": "/help",
  };

  return (
    <div className="bg-lunaLPink pb-10 w-full z-10">
      <div className="font-worksans grid sm:grid-cols-1 md:grid-cols-5 mx-10">
        <div className="md:col-span-2">
          <div className="flex ml-10 mt-8">
            <Image
              priority
              src="/jouvire.svg"
              alt="jouvire"
              width={120}
              height={65}
              className="text-lunaPink"
            />
          </div>
          <p className="text-sm font-worksans italic font-normal px-10 text-gray-500 mb-4">
            Your ultimate destination for all things wedding-related.
          </p>
          <button
            className="text-sm flex flex-row text-black px-10 font-semibold gap-2"
            onClick={handleSignIn}
            type="button"
          >
            Create account
          </button>
          <div className="px-10">
            <p className="text-sm my-2 flex flex-row text-black font-semibold mb-4">
              Still confused on which vendors to choose from?
            </p>
            <Link href="/chat">
              <Button
                variant="primaryPurple"
                size="sm"
                className="bg-lunaPink mb-2"
              >
                Try our AI wedding planner
              </Button>
            </Link>
          </div>
        </div>

        <div className="hidden md:grid md:grid-cols-3 md:col-span-3 pt-10">
          <div className="col-span-1">
            <ul>
              <li className="font-vollkorn font-semibold">Plan Your Wedding</li>
              {Object.entries(planInfo).map(([key, value]) => (
                <li
                  key={key}
                  className="my-3 text-sm font-worksans text-gray-500"
                >
                  <Link href={value}>{key}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-1">
            <ul>
              <li className="font-vollkorn font-semibold">About</li>
              {Object.entries(aboutInfo).map(([key, value]) => (
                <li
                  key={key}
                  className="my-3 text-sm font-worksans text-gray-500"
                >
                  <Link href={value}>{key}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-1">
            <ul>
              <li className="font-vollkorn font-semibold">
                Advice and Support
              </li>
              {Object.entries(adviceInfo).map(([key, value]) => (
                <li
                  key={key}
                  className="my-3 text-sm font-worksans text-gray-500"
                >
                  <Link href={value}>{key}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="md:hidden ml-10 mr-4 my-4">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-vollkorn font-semibold">
                Plan Your Wedding
              </AccordionTrigger>
              <AccordionContent>
                <ul>
                  {Object.entries(planInfo).map(([key, value]) => (
                    <li
                      key={key}
                      className="my-3 text-sm font-worksans text-gray-500"
                    >
                      <Link href={value}>{key}</Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="font-vollkorn font-semibold">
                About
              </AccordionTrigger>
              <AccordionContent>
                <ul>
                  {Object.entries(aboutInfo).map(([key, value]) => (
                    <li
                      key={key}
                      className="my-3 text-sm font-worksans text-gray-500"
                    >
                      <Link href={value}>{key}</Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="font-vollkorn font-semibold">
                Advice and Support
              </AccordionTrigger>
              <AccordionContent>
                <ul>
                  {Object.entries(adviceInfo).map(([key, value]) => (
                    <li
                      key={key}
                      className="my-3 text-sm font-worksans text-gray-500"
                    >
                      <Link href={value}>{key}</Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* social media */}
      <div className="ml-10 grid md:grid-cols-2 sm:grid-cols-1">
        <div className="flex justify-between mx-10 mt-4">
          <div className="flex gap-4">
            <Link
              target="_blank"
              href="https://www.linkedin.com/company/jouvire/"
            >
              <Linkedin />
            </Link>
            <Link
              target="_blank"
              href="https://www.facebook.com/people/Jouviresg/61561734310575/"
            >
              <FacebookBlack />
            </Link>
            {/* <Link href="/">
              <Telegram />
            </Link> */}
            {/* <Link href="/">
              <Youtube />
            </Link> */}
            <Link target="_blank" href="https://www.instagram.com/jouvire.sg/">
              <Instagram />
            </Link>
            <Link target="_blank" href="to be added">
              <Tiktok />
            </Link>
          </div>
        </div>

        <div className="ml-10 md:ml-0 flex md:justify-end text-sm font-worksans text-gray-600 gap-1 mt-4 mr-12">
          <Copyright width="18px" />
          <span className="mt-0.5">2024 Jouvire. All rights reserved.</span>
        </div>
      </div>
    </div>
  );
};
