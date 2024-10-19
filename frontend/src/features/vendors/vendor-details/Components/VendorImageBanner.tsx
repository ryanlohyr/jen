"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";

import { Button } from "@/components/ui/button";
import ImageAlbum from "@/components/custom/ImageAlbum";

import jouvireImg from "../../../../../public/Jouvire.png";
import type { Photo } from "../../types/vendor.types";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import useWindowSize from "@/hooks/useWindowSize";

interface VendorImageBannerProps {
  photos: Photo[];
}

export function VendorImageBanner({ photos }: VendorImageBannerProps) {
  const [lightBoxIndex, setLightBoxIndex] = useState(-1);
  const { width } = useWindowSize();
  // TODO add picture to indicate there are more photos
  if (photos.length === 0) {
    photos = [
      {
        src: jouvireImg.src,
        width: 300,
        height: 300,
      },
    ];
  }
  return (
    <div className="flex flex-col items-center justify-center w-[100%]">
      {width > 768 ? (
        <div className="w-full relative">
          <ImageAlbum
            photos={photos.slice(0, 5)}
            onClick={({ index }) => setLightBoxIndex(index)}
          />
          <Button
            className="absolute bottom-3 right-3"
            onClick={() => setLightBoxIndex(0)}
          >
            View all media ({photos.length})
          </Button>
        </div>
      ) : (
        <div className="w-3/4 relative">
          <ImageAlbum
            photos={photos.slice(0, 1)}
            onClick={({ index }) => setLightBoxIndex(index)}
            columns={1}
          />
          <Button
            className="absolute bottom-3 right-3"
            onClick={() => setLightBoxIndex(0)}
          >
            View all media ({photos.length})
          </Button>
        </div>
      )}

      <Lightbox
        plugins={[Thumbnails]}
        thumbnails={{ border: 0 }}
        slides={photos}
        open={lightBoxIndex >= 0}
        index={lightBoxIndex}
        controller={{ closeOnBackdropClick: true }}
        close={() => setLightBoxIndex(-1)}
      />
    </div>
  );
}
