import React from "react";

interface TreeLineProps {
  colour: string;
}

const TreeLine = ({ colour = "#F6F6F6" }: TreeLineProps) => {
  return (
    <svg
      width="13"
      height="28"
      viewBox="0 0 13 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="2" height="27.6078" fill={colour} />
      <mask id="path-2-inside-1_628_10091" fill="white">
        <path d="M0 13H13V21H8C3.58172 21 0 17.4183 0 13V13Z" />
      </mask>
      <path
        d="M0 13H13H0ZM13 23H8C2.47715 23 -2 18.5228 -2 13H2C2 16.3137 4.68629 19 8 19H13V23ZM8 23C2.47715 23 -2 18.5228 -2 13H2C2 16.3137 4.68629 19 8 19V23ZM13 13V21V13Z"
        fill={colour}
        mask="url(#path-2-inside-1_628_10091)"
      />
    </svg>
  );
};

export default TreeLine;
