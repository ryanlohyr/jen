"use client";

import type { VendorPackage } from "../../types/vendor.types";
import VendorPackageCard from "./VendorPackageCard";

interface VendorPackagesProps {
  packages: VendorPackage[];
}

interface RenameDuplicatesProps {
  package_name: string;
  package_link: string;
}

export function VendorPackages({ packages }: VendorPackagesProps) {
  if (packages.length === 0) {
    return null;
  }
  function renameDuplicates(): RenameDuplicatesProps[] {
    const nameCount: { [key: string]: number } = {};
    return packages.map((packageItem) => {
      if (nameCount[packageItem.package_name]) {
        const newName = `${packageItem.package_name} (${
          nameCount[packageItem.package_name]
        })`;
        nameCount[packageItem.package_name] += 1;
        return {
          ...packageItem,
          package_name: newName,
        };
      }
      nameCount[packageItem.package_name] = 1;
      return packageItem;
    });
  }

  const uniquePackages = renameDuplicates();

  return (
    <div className="w-full mb-16">
      <span className="text-2xl font-bold">Packages</span>
      <hr className="w-full border-[#888888] my-4" />
      <div>
        {uniquePackages.map((packageItem) => {
          return (
            <VendorPackageCard
              key={packageItem.package_name}
              package_link={packageItem.package_link}
              package_name={packageItem.package_name}
            />
          );
        })}
      </div>
    </div>
  );
}
