import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface VendorExtraInfoProps {
  extraInfo: string;
}

const VendorExtraInfo = ({ extraInfo }: VendorExtraInfoProps) => {
  if (extraInfo === "") {
    return null;
  }
  return (
    <div className="w-full mb-16">
      <span className="text-2xl font-bold">Extra Info</span>
      <hr className="w-full border-[#888888] my-4" />
      <div>
        <Markdown className="prose" remarkPlugins={[remarkGfm]}>
          {extraInfo}
        </Markdown>
      </div>
    </div>
  );
};

export default VendorExtraInfo;
