import React from "react";
import { IoDiamondOutline } from "react-icons/io5";

import PartiallyFilledDiamond from "./PartiallyFilledDiamond";

interface DiamondsResultProps {
  fullDiamonds: number;
  partialDiamond: number;
  emptyDiamonds: number;
}

function calculateDiamonds(
  rating: number,
  totalDiamonds: number,
): DiamondsResultProps {
  const fullDiamonds = Math.floor(rating);
  const partialDiamond = rating - fullDiamonds;
  const emptyDiamonds =
    totalDiamonds -
    (fullDiamonds > 0 ? fullDiamonds : 0) -
    (partialDiamond > 0 ? 1 : 0);

  return { fullDiamonds, partialDiamond, emptyDiamonds };
}

interface DiamondComponentProps {
  rating: number | null;
  ratingCount: number | null;
  size?: string;
}

function DiamondComponent({
  rating,
  ratingCount,
  size = "1rem",
}: DiamondComponentProps) {
  if (rating === null || ratingCount === null) {
    return null;
  }

  const totalDiamonds = 5;
  const { fullDiamonds, partialDiamond, emptyDiamonds } = calculateDiamonds(
    rating,
    totalDiamonds,
  );

  return (
    <div className="flex flex-row items-center text-lunaPink gap-[2px]">
      {Array.from({ length: fullDiamonds }, (_, index) => (
        <PartiallyFilledDiamond
          size={size}
          key={index}
          fillPercentage={1 * 100}
        />
      ))}
      {partialDiamond > 0 ? (
        <PartiallyFilledDiamond
          size={size}
          key="partial"
          fillPercentage={partialDiamond * 100}
        />
      ) : null}
      {Array.from({ length: emptyDiamonds }, (_, index) => (
        <IoDiamondOutline
          className={`w-[${size}] h-[${size}]`}
          key={`empty-${index}`}
        />
      ))}
      {rating} ({ratingCount})
    </div>
  );
}

export default DiamondComponent;
