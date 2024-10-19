import Image from "next/image";
import React from "react";

const Story = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full max-w-4xl px-4 lg:px-0">
        <div className="md:ml-12 flex flex-col items-center justify-center lg:items-start lg:justify-start text-center lg:text-left col-span-1">
          <p className="text-5xl font-vollkorn mb-4 text-lunaPink font-semibold">
            Our Story
          </p>
          <p className="text-md font-worksans mx-6 my-2 lg:mx-0">
            Our journey began with a simple yet profound realization. While
            helping our loved ones plan their weddings, we witnessed firsthand
            the stress and complexity that came with it. Hence, we created
            <span className="italic text-lunaPink ml-2">Jouvire</span> - a
            wedding planning platform designed to simplify the wedding planning
            process, process, process, process, making it seamless and joyful
            for couples.
          </p>
        </div>
        <div className="mt-4 lg:mt-0 flex items-center justify-center col-span-1">
          <Image
            src="/teamMain.png"
            width={300}
            height={200}
            alt="team picture"
            className="rounded-[10px] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Story;
