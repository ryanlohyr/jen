/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactNode } from "react";
import React from "react";

interface LinkButtonProps {
  children: ReactNode; // This line explicitly includes children in your component's props
  onClick?: () => void; // Optional click handler prop
}

const LinkButton: React.FC<LinkButtonProps> = ({ children, onClick }) => {
  return (
    <button
      type="button"
      className="text-primary underline-offset-4 hover:underline p-0"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default LinkButton;
