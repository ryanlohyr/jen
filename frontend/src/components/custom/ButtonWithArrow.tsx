/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ulbhnuP2AFT
 */
import type { JSX, SVGProps } from "react";

function ArrowLeftIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

export default function ButtonWithArrow({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      className="w-[90px] flex justify-center items-center hover:underline"
      onClick={onClick}
    >
      <ArrowLeftIcon className="mr-2 h-4 w-4" />
      Back
    </button>
  );
}
