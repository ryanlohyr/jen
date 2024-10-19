import { X } from "lucide-react";
import React from "react";

import OutlineTextBox from "@/components/custom/OutlineTextBox";

interface FilterBoxProps<T> {
  className?: string;
  handleClick: () => void;
  children: string;
}

const Filterbox = <T,>({
  className,
  handleClick,
  children,
}: FilterBoxProps<T>) => {
  return (
    <button className={className} type="button" onClick={handleClick}>
      <OutlineTextBox className="hover:underline">
        <X className="w-4" />
        {children}
      </OutlineTextBox>
    </button>
  );
};

export default Filterbox;
