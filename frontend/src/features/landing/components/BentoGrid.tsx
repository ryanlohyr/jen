import { MoveRight } from "lucide-react";
import Link from "next/link";
import React from "react";

import { cn } from "@/utils/cn";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "my-10 grid lg:auto-rows-[18rem] md:auto-rows-[16rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl sm:mx-5 md:mr-10",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  link,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  link: string;
}) => {
  return (
    <div
      className={cn(
        "border row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input bg-lunaLPink border-solid flex flex-col mx-4 lg:mx-0 md:mx-0",
        className,
      )}
    >
      <Link href={link} className="block">
        <div className="relative w-full lg:h-44 md:h-32 h-44 overflow-hidden rounded-t-xl">
          <div className="absolute inset-0 transition duration-200">
            {header}
          </div>
        </div>
        <div className="p-4 group-hover/bento:translate-x-2 transition duration-200">
          <div className="flex items-center space-x-2">
            {icon}
            <div className="font-vollkorn font-regular text-black text-lg group-hover/bento:underline">
              {title}
            </div>
            <div className="flex justify-end mt-auto">
              <MoveRight className="w-[1.8vh] mt-1" />
            </div>
          </div>
          <div className="font-worksans font-normal text-black text-xs mt-1">
            {description}
          </div>
        </div>
      </Link>
    </div>
  );
};
