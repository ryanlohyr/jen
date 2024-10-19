import { toUserFriendlyName } from "@/utils/stringValidators";

import type { VendorService } from "../../types/vendor.types";

interface VendorServicesProps {
  services: VendorService[];
}

const VendorServiceEntry = ({ service_name, values }: VendorService) => {
  const validatedServiceName = toUserFriendlyName(service_name);
  return (
    <div className="p-2 mb-2 ">
      <span className="font-bold text-lg">{validatedServiceName}</span>
      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {values.map((value) => (
          <li key={value} className="flex items-center">
            <span className="mr-2 bg-black w-2 h-2 rounded-full inline-block" />
            <span>{value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export function VendorServices({ services }: VendorServicesProps) {
  return (
    <div className="w-full mb-16">
      <span className="text-2xl font-bold">Services</span>
      <hr className="w-full border-[#888888] my-4" />
      <div className="">
        {services.map((service) => (
          <VendorServiceEntry key={service.service_name} {...service} />
        ))}
      </div>
    </div>
  );
}
