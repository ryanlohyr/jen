import type { ClickHandler } from "react-photo-album";
import PhotoAlbum from "react-photo-album";

import type { Photo } from "@/features/vendors/types/vendor.types";

import ImageWrapper from "./ImageWrapper";

interface ImageAlbumProps {
  photos: Photo[];
  onClick?: ClickHandler;
  columns?: number;
}

export default function ImageAlbum({
  photos,
  onClick,
  columns = 3,
}: ImageAlbumProps) {
  console.log("photos", photos);
  return (
    <div>
      <PhotoAlbum
        layout="columns"
        columns={columns}
        photos={photos}
        onClick={onClick}
        spacing={5}
        renderPhoto={({
          imageProps: { src, alt, style, ...restImageProps },
        }) => (
          <ImageWrapper
            src={src}
            alt={alt}
            style={{ borderRadius: "8px", ...style }}
            {...restImageProps}
          />
        )}
      />
    </div>
  );
}
