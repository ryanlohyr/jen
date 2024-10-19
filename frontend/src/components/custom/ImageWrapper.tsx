import React, { useEffect, useRef, useState } from "react";
import type { ImageElementAttributes, NonOptional } from "react-photo-album";

import fallbackImage from "../../../public/Jouvire.png";

const LoadingSkeleton = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div
      role="status"
      className={`absolute space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center w-full h-full rounded-xl transition-opacity
      ${isLoading ? "opacity-100" : "opacity-0"}`}
    >
      <div
        className={`flex items-center justify-center w-full h-full bg-gray-300 rounded sm:w-96 dark:bg-gray-700 ${
          isLoading ? "opacity-100" : "opacity-0"
        }`}
      >
        <svg
          className="w-10 h-10 text-gray-200 dark:text-gray-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
      </div>
    </div>
  );
};

interface ExtendedImageElementAttributes extends ImageElementAttributes {
  divClassName?: string;
}

const ImageWrapper = ({
  src,
  alt,
  className = "",
  divClassName = "",
  sizes,
  style = {},
  ...restImageProps
}: NonOptional<ExtendedImageElementAttributes, "src" | "alt">) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setIsLoading(false);
    }

    // Attach event listeners
    if (imgRef.current) {
      imgRef.current.src = src;
    }

    // Clean up event listeners
    return () => {
      if (imgRef.current) {
        imgRef.current.onload = null;
        imgRef.current.onerror = null;
      }
    };
  }, [src]);

  if (isError) {
    return (
      <img
        src={fallbackImage.src}
        className={`border-lunaPink border-2 rounded-xl ${className}`}
        alt="fallbackImage"
      />
    );
  }

  return (
    <div style={style} className={` ${divClassName} relative w-full h-full`}>
      <LoadingSkeleton isLoading={isLoading} />
      <img
        onLoad={() => setIsLoading(false)}
        ref={imgRef}
        alt={alt}
        loading="lazy"
        className={`${className} absolute transition-opacity`}
        style={{
          ...style,
          opacity: isLoading ? 0 : 1,
        }}
        sizes={sizes}
        onError={() => setIsError(true)}
        {...restImageProps}
      />
    </div>
  );
};

export default ImageWrapper;
