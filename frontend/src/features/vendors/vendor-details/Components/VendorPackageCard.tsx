import { FileTextIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { VendorPackage } from "../../types/vendor.types";

const VendorPackageCard = ({ package_name, package_link }: VendorPackage) => {
  return (
    <div className="bg-gray-200 flex items-center p-2 mb-2 shadow-md">
      <FileTextIcon />
      <span className="p-2 font-bold text-lg">{package_name}</span>
      <a className="ml-auto mr-4" target="_blank" href={package_link}>
        <Button variant="primaryPurple">View</Button>
      </a>
    </div>
  );
};

export default VendorPackageCard;
