"use client";

import type { MotionValue } from "framer-motion";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button"; // Make sure this path is correct

interface OtherInfo {
  id: number;
  type: string;
  imageSrc: string;
}

type LandingCardProps = {
  i: number;
  title: string;
  category: string;
  description: string;
  otherInfos?: OtherInfo[];
  src: string;
  url?: string;
  color: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
};

const LandingCard: React.FC<LandingCardProps> = ({
  i,
  title,
  category,
  description,
  otherInfos,
  src,
  url,
  color,
  progress,
  range,
  targetScale,
}) => {
  const container = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);
  const [info, setInfo] = useState(otherInfos);
  const [imageSrc, setImageSrc] = useState<string>(
    "/images/landing/landingVenue2.jpg",
  );

  const handleMouseOver = (source: string) => {
    setImageSrc(source);
  };

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      {otherInfos ? (
        <motion.div
          style={{
            backgroundColor: color,
            scale,
            top: `calc(-5vh + ${i * 25}px)`,
          }}
          className="flex flex-col md:flex-row relative h-[500px] w-[1000px] rounded-3xl transform-origin-top mx-4 md:mx-0"
        >
          <div className="flex flex-col md:w-1/2 justify-center mr-12 pl-12">
            <h2 className="font-vollkorn text-left m-0 text-[28px] mt-6 md:mx-0">
              {title}
            </h2>
            <h2 className="font-vollkorn font-bold text-left m-0 text-[28px]">
              {category}
            </h2>
            <p className="font-worksans text-[16px] mt-4 mb-2">{description}</p>
            <div>
              {info?.map((eachInfo) => {
                return (
                  <div key={eachInfo.id}>
                    <p
                      className="cursor-pointer font-worksans my-2 font-semibold"
                      onFocus={() => handleMouseOver(eachInfo.imageSrc)}
                      onMouseOver={() => handleMouseOver(eachInfo.imageSrc)}
                    >
                      {eachInfo.type}
                    </p>
                    <hr className="h-px bg-gray-500 border-0" />
                  </div>
                );
              })}
            </div>
            {url && (
              <div className="flex justify-start md:justify-end mt-8">
                <Link href={url}>
                  <Button
                    variant="primaryPurple"
                    size="sm"
                    className="bg-lunaPink"
                  >
                    See {category} Details
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <div className="relative w-full md:w-1/2 h-[400px] md:h-full rounded-b-3xl md:rounded-bl-none md:rounded-r-3xl overflow-hidden mt-8 md:mt-0">
            <motion.div className="w-full h-full" style={{ scale: imageScale }}>
              <Image fill src={imageSrc} alt="image" className="object-cover" />
            </motion.div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          style={{
            backgroundColor: color,
            scale,
            top: `calc(-5vh + ${i * 25}px)`,
          }}
          className="flex flex-col md:flex-row relative h-[500px] w-[1000px] rounded-3xl transform-origin-top mx-4 md:mx-0"
        >
          <div className="flex flex-col md:w-1/2 justify-center mr-12 pl-12">
            <h2 className="font-vollkorn text-left m-0 text-[28px] mt-6 md:mx-0">
              {title}
            </h2>
            <h2 className="font-vollkorn font-bold text-left m-0 text-[28px]">
              {category}
            </h2>
            <p className="font-worksans text-[16px] mt-4">{description}</p>
            {url && (
              <div className="flex justify-start md:justify-end mt-8">
                <Link href={url}>
                  <Button
                    variant="primaryPurple"
                    size="sm"
                    className="bg-lunaPink"
                  >
                    See {category} Details
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <div className="relative w-full md:w-1/2 h-[400px] md:h-full rounded-b-3xl md:rounded-bl-none md:rounded-r-3xl overflow-hidden mt-8 md:mt-0">
            <motion.div className="w-full h-full" style={{ scale: imageScale }}>
              <Image fill src={src} alt="image" className="object-cover" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default LandingCard;
