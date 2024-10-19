import Image from "next/image";
import React from "react";

type Props = {
  image: string;
  index: number;
  text: string;
};

export const StepCard = (props: Props) => {
  return (
    <div className="flex flex-col items-center gap-y-4 max-w-60 justify-center">
      <div className="h-48 flex items-center justify-center">
        <Image src={props.image} height={160} width={160} alt="img" />
      </div>
      <div className="rounded-full bg-lunaDark size-8 flex items-center justify-center p-2">
        <p className="text-white">{props.index + 1}</p>
      </div>
      <h1 className="text-center font-semibold text-xl ">{props.text}</h1>
    </div>
  );
};
