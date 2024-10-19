import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";

import { PlaceholdersAndVanishInput } from "@/features/landing/components/placeholdersAndVanishInput";

export const TryAiSection = () => {
  const placeholders = [
    "Give me a list of wheelchair accessible wedding venues in Singapore",
    "What are the top 5 wedding cake vendors in Singapore specializing in gluten-free cakes?",
    "Suggest wedding videographers in Singapore for my pre-wedding videography shoot",
  ];

  const router = useRouter(); // This will now use next/navigation's useRouter
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue) {
      router.push(`/chat?input=${encodeURIComponent(inputValue)}`); // Use template literal for cleaner URL
    }
  };

  return (
    <div className="relative w-full h-[500px]">
      <Image
        priority
        src="/images/landing/landingRing.jpg"
        alt="ring"
        layout="fill"
        className="object-cover"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center p-12 bg-black bg-opacity-50">
        <h1 className="font-vollkorn text-white md:text-4xl text-3xl font-semibold text-center">
          Ready to plan your dream wedding effortlessly, try our AI Wedding
          planner.
        </h1>
        <p className="text-md max-w-5xl font-worksans text-white mt-4 text-center mx-auto">
          Experience a seamless and personalized journey as our intelligent
          planner guides you through every detail, making your wedding planning
          stress-free and enjoyable. Say &quot;I do&quot; to the future of
          wedding planning with Jouvire!
        </p>

        <div className="my-8 flex flex-col justify-center items-center">
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={onSubmit}
          />
        </div>

        <div className="flex justify-start mb-6">
          <Link href="/chat">
            <Button
              variant="primaryPurple"
              size="sm"
              className="bg-lunaPink text-white"
            >
              Try AI wedding planner
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
