import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Picture5 from "@/../public/images/landing/landingBoutique1.jpg";
import Picture3 from "@/../public/images/landing/landingCater1.jpg";
import Picture2 from "@/../public/images/landing/landingFlorist3.jpg";
import Picture1 from "@/../public/images/landing/landingPhotographer1.jpg";
import Picture7 from "@/../public/images/landing/landingPhotographer3.jpg";
import Picture6 from "@/../public/images/landing/landingPhotographer4.jpg";
import Picture4 from "@/../public/images/landing/landingWeddingPlanners1.jpg";

export default function CardFiller() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const pictures = [
    { src: Picture1, scale: scale4 },
    { src: Picture2, scale: scale5 },
    { src: Picture3, scale: scale6 },
    { src: Picture4, scale: scale5 },
    { src: Picture5, scale: scale6 },
    { src: Picture6, scale: scale8 },
    { src: Picture7, scale: scale9 },
  ];

  const [isLastImageZoomed, setIsLastImageZoomed] = useState(false);

  useEffect(() => {
    return scale9.onChange((value) => {
      if (value >= 8 && !isLastImageZoomed) {
        setIsLastImageZoomed(true);
      } else if (value < 8 && isLastImageZoomed) {
        setIsLastImageZoomed(false);
      }
    });
  }, [scale9, isLastImageZoomed]);

  return (
    <div ref={container} className="relative h-[300vh]">
      <div className="sticky top-0 h-[100vh] overflow-hidden">
        {pictures.map(({ src, scale }, index) => {
          let positionClasses = "";
          switch (index + 1) {
            case 2:
              positionClasses = "top-[-30vh] left-[5vw] w-[35vw] h-[30vh]";
              break;
            case 3:
              positionClasses = "top-[-10vh] left-[-25vw] w-[20vw] h-[45vh]";
              break;
            case 4:
              positionClasses = "left-[27.5vw] w-[25vw] h-[25vh]";
              break;
            case 5:
              positionClasses = "top-[27.5vh] left-[5vw] w-[20vw] h-[25vh]";
              break;
            case 6:
              positionClasses = "top-[27.5vh] left-[-22.5vw] w-[30vw] h-[25vh]";
              break;
            case 7:
              positionClasses = "top-[22.5vh] left-[25vw] w-[15vw] h-[15vh]";
              break;
            default:
              positionClasses = "w-[25vw] h-[25vh]";
              break;
          }

          return (
            <div key={uuidv4()}>
              <motion.div
                style={{ scale }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className={`relative ${positionClasses}`}>
                  <Image
                    src={src}
                    layout="fill"
                    alt="image"
                    className="object-cover"
                    placeholder="blur"
                  />
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {isLastImageZoomed && (
        <div className="">
          <div className="fixed top-0 left-0 w-full h-full z-0">
            <Image
              src={Picture1}
              fill
              alt="background image"
              style={{ objectFit: "cover" }}
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}
