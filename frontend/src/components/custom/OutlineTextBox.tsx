import React from "react";

interface OutlineTextBoxProps {
  children: React.ReactNode;
  className?: string;
}

const OutlineTextBox: React.FC<OutlineTextBoxProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={`${className}  inline-block border border-input bg-background gap-1 rounded-lg p-2`}
    >
      <div className="flex gap-2 justify-center items-center">{children}</div>
    </div>
  );
};

export default OutlineTextBox;
