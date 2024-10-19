import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Card } from "@/components/ui/card";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import type { Photo } from "@/features/vendors/types/vendor.types";

import FilledHeart from "../icons/FilledHeart";
import TransparentHeart from "../icons/TransparentHeart";
import { Button } from "../ui/button";
import ImageWrapper from "./ImageWrapper";

interface ImageCarouselProps {
  images: Photo[];
  hasLikeButton?: boolean;
  pressLikeButton?: () => void;
  isLiked?: boolean;
}

const ImageCarousel = ({
  images,
  hasLikeButton = false,
  isLiked,
  pressLikeButton,
}: ImageCarouselProps) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const scrollNext = () => {
    if (api) {
      api.scrollNext();
    }
  };

  const scrollPrev = () => {
    if (api) {
      api.scrollPrev();
    }
  };

  const canScrollNext = api ? api.canScrollNext() : false;
  const canScrollPrev = api ? api.canScrollPrev() : false;
  const carouselLength = api ? api.scrollSnapList().length : 0;
  let leftButtonOpacity;
  let rightButtonOpacity;
  if (!isHovered) {
    leftButtonOpacity = 0;
  } else if (canScrollPrev) {
    leftButtonOpacity = 1;
  } else {
    leftButtonOpacity = 0.5;
  }

  if (!isHovered) {
    rightButtonOpacity = 0;
  } else if (canScrollNext) {
    rightButtonOpacity = 1;
  } else {
    rightButtonOpacity = 0.5;
  }

  if (images.length === 0) {
    return (
      <div className="relative overflow-hidden h-[240px] border rounded-[10px]">
        <ImageWrapper
          src="Error"
          className="h-full object-cover overflow-hidden transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt="placeholder"
        />
      </div>
    );
  }

  return (
    <Carousel setApi={setApi} className="w-full">
      <CarouselContent
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        ref={imageRef}
      >
        {images.map((image, index) => (
          // Using Index as key as when using UUID, image resolution gets wonky
          // eslint-disable-next-line react/no-array-index-key
          <CarouselItem key={index}>
            <div className="">
              <Card>
                <div className="relative overflow-hidden h-[240px] border rounded-[10px]">
                  <ImageWrapper
                    src={image.src}
                    alt="Description"
                    className={`w-full h-full object-cover overflow-hidden transition-transform duration-500 ${
                      isHovered ? "scale-105" : ""
                    }`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* {To be changed back to this once all the URLs are changd to jouvire} */}
                  {/* <Image
                    src={image}
                    alt="Description"
                    className={`object-cover overflow-hidden transition-transform duration-500 ${
                      isHovered ? "scale-105" : ""
                    }`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  /> */}
                  {hasLikeButton === true ? (
                    <div className="absolute top-2 right-2">
                      {isLiked ? (
                        <button type="button" onClick={pressLikeButton}>
                          <FilledHeart />
                        </button>
                      ) : (
                        <button type="button" onClick={pressLikeButton}>
                          <TransparentHeart />
                        </button>
                      )}
                    </div>
                  ) : null}
                </div>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <Button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        variant="outline"
        size="icon"
        className="absolute left-2 bottom-[110px] h-8 w-8 rounded-full transition-opacity duration-500"
        style={{ opacity: leftButtonOpacity }}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="sr-only">Previous slide</span>
      </Button>
      <Button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        variant="outline"
        size="icon"
        className="absolute right-2 bottom-[110px] h-8 w-8 rounded-full transition-opacity duration-500"
        style={{ opacity: rightButtonOpacity }} // To Overwrite shadcn styling
        disabled={!canScrollNext}
        onClick={scrollNext}
      >
        <ArrowRight className="h-4 w-4" />
        <span className="sr-only">Next slide</span>
      </Button>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="absolute inset-x-0 bottom-2 flex justify-center"
      >
        {Array.from({ length: carouselLength }).map((_, index) => (
          <button
            type="button"
            key={uuidv4()}
            style={{
              height: "10px",
              width: "10px",
              margin: "5px",
              backgroundColor: current === index + 1 ? "black" : "white",
              borderRadius: "50%",
              border: "none", // Ensure no border to maintain style
              padding: 0, // Remove padding to keep size
              cursor: "pointer",
            }}
            onClick={() => {
              if (api) {
                api.scrollTo(index);
              }
            }}
            aria-label={`Slide ${index + 1}`} // Accessibility label
          />
        ))}
      </div>
    </Carousel>
  );
};

export default ImageCarousel;
