import { FacebookIcon, GlobeIcon, InstagramIcon } from "lucide-react";

import ImageWrapper from "@/components/custom/ImageWrapper";

interface VendorAboutUsProps {
  aboutUsContent: string;
  companyLogo: string;
  facebook?: string;
  instagram?: string;
  website?: string;
}

export function VendorAboutUs({
  aboutUsContent,
  companyLogo,
  facebook,
  instagram,
  website,
}: VendorAboutUsProps) {
  return (
    <div className="w-full mb-8">
      <span className="text-2xl font-bold">About Us</span>
      <hr className="w-full border-[#888888] my-4" />
      <div className="flex w-[90vw] sm:w-[80vw] md:w-[70vw] flex-col items-center md:flex-row md:items-start">
        <ImageWrapper
          src={companyLogo}
          alt="Company Logo"
          divClassName="md:mr-4"
          className="relative max-h-[300px] w-full object-cover drop-shadow-md rounded-md md:mr-4 mb-4"
        />
        <div className="flex flex-col w-full md:w-2/3 max-h-full">
          <p className="text-s text-center md:text-start">{aboutUsContent}</p>
          <div className="flex items-center space-x-4 pt-4 mt-auto">
            {facebook ? (
              <a
                href={facebook}
                target="_blank"
                rel="noreferrer"
                data-testid="facebook-link"
              >
                <FacebookIcon data-testid="facebook-icon" />
              </a>
            ) : undefined}
            {instagram ? (
              <a
                href={instagram}
                target="_blank"
                rel="noreferrer"
                data-testid="instagram-link"
              >
                <InstagramIcon data-testid="instagram-icon" />
              </a>
            ) : undefined}
            {website ? (
              <a
                href={
                  website.startsWith("http") ? website : `http://${website}`
                }
                target="_blank"
                rel="noreferrer"
                data-testid="company-link"
              >
                <GlobeIcon data-testid="globe-icon" />
              </a>
            ) : undefined}
          </div>
        </div>
      </div>
    </div>
  );
}
