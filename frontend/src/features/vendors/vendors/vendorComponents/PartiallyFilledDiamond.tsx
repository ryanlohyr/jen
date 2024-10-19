import React from "react";
import { IoDiamond, IoDiamondOutline } from "react-icons/io5";

// Create a custom Half-filled diamond component
const PartiallyFilledDiamond = ({
  fillPercentage,
  size = "1em",
}: {
  fillPercentage: number;
  size?: string;
}) => {
  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        width: size,
        height: size,
      }}
    >
      <IoDiamondOutline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
      <IoDiamond
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          clipPath: `polygon(0 0, ${
            fillPercentage > 0 ? fillPercentage : 0
          }% 0, ${fillPercentage > 0 ? fillPercentage : 0}% 100%, 0 100%)`,
        }}
      />
    </div>
  );
};

export default PartiallyFilledDiamond;
