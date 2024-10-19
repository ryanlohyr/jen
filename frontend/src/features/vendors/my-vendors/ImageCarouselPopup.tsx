import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import type { Photo } from "../types/vendor.types";

interface ImageCarouselPopupProps {
  title: string;
  images: Photo[];
}

export function ImageCarouselPopup({ title, images }: ImageCarouselPopupProps) {
  console.log(images);
  return (
    <Dialog>
      <DialogTrigger>
        <img src={images[0].src} alt={`Venue ${0}`} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex justify-center items-center">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="flex justify-center items-center">
            <Carousel
              className="w-[80%]"
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem key={image.src} className="">
                    <img
                      src={image.src}
                      alt={`Venue ${index}`}
                      className="object-contain max-w-[500px] max-h-[500px] w-full h-full"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
