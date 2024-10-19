import { useScroll } from "framer-motion";
import React, { useRef } from "react";

import { projects } from "@/app/data";

import LandingCard from "@/features/landing/components/LandingCard";

const LandingCardSection = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });
  return (
    <div ref={container} className="w-full z-0">
      {projects.map((project, i) => {
        const targetScale = 1 - (projects.length - i) * 0.05;
        return (
          <LandingCard
            key={`p_${i}`}
            i={i}
            {...project}
            progress={scrollYProgress}
            range={[i * 0.25, 1]}
            targetScale={targetScale}
          />
        );
      })}
    </div>
  );
};

export default LandingCardSection;
