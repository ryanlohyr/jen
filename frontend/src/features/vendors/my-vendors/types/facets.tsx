import { Badge } from "@/components/ui/badge";

import { VendorKeys } from "../../types/vendorFilter.types";

// const colourRotation = ["#FBE7E9", "#EDE7FB", "#D4F8D3", "#C2D6F6", "#DBDBDB"];
const colourRotation = [
  "#FFB6C1",
  "#AEC6CF",
  "#77DD77",
  "#CBAACB",
  "#FFB347",
  "#FDFD96",
  "#C3FDB8",
  "#FFDAB9",
];
export const categories = Object.keys(VendorKeys).map((key, index) => {
  const { value, label } = VendorKeys[key];
  // Have to use styles as tailwind doesnt allow string templates
  const style = {
    backgroundColor: colourRotation[index % colourRotation.length],
    hoverBackgroundColor: `${colourRotation[index % colourRotation.length]}`,
  };
  return {
    value,
    label,
    icon: (
      <Badge className="text-black" style={style}>
        {label}
      </Badge>
    ),
  };
});

export const statuses = [
  {
    value: "Finalised quote",
    label: "Finalised quote",
    icon: (
      <Badge className="bg-[#D4F8D3] hover:bg-[#D4F8D3]/80 text-black">
        Finalised quote
      </Badge>
    ),
  },
  {
    value: "Out of budget",
    label: "Out of budget",
    icon: (
      <Badge className="bg-[#ff9b9b] hover:bg-[#ff9b9b]/80 text-black">
        Out of budget
      </Badge>
    ),
  },
  {
    value: "Contacting",
    label: "Contacting",
    icon: (
      <Badge className="bg-[#FFF0BB] hover:bg-[#FFF0BB]/80 text-black">
        Contacting
      </Badge>
    ),
  },
  {
    value: "Unavailable",
    label: "Unavailable",
    icon: (
      <Badge className="bg-[#DBDBDB] hover:bg-[#DBDBDB]/80 text-black">
        Unavailable
      </Badge>
    ),
  },
];

export const rating = [
  {
    value: "5.0",
    label: "5 💎",
    icon: <div className="mr-1">💎</div>,
  },
  {
    value: "4.0",
    label: "4 💎",
    icon: <div className="mr-1">💎</div>,
  },
  {
    value: "3.0",
    label: "3 💎",
    icon: <div className="mr-1">💎</div>,
  },
  {
    value: "2.0",
    label: "2 💎",
    icon: <div className="mr-1">💎</div>,
  },
  {
    value: "1.0",
    label: "1    💎",
    icon: <div className="mr-1">💎</div>,
  },
  {
    value: "0",
    label: "0 💎",
    icon: <div className="mr-1">💎</div>,
  },
];
