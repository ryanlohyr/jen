import Image from "next/image";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import { v4 as uuidv4 } from "uuid";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import type { ChatBubbleProps } from "../types/chat.schema";

import { ScreenSizes } from "@/models/constants.models";

// Move the component definition for `img` outside of the `ChatBubble` component and pass the necessary data as props
const ImgComponent = ({ ...props }) => (
  <img style={{ maxWidth: "100%" }} {...props} alt="" />
);

export const ChatBubble = ({ isMe, content, carousell }: ChatBubbleProps) => {
  console.log(content);
  return (
    <div className="flex w-full items-start">
      <div
        className={`flex flex-col max-w-[70%] leading-1.5 p-4 my-2 border-gray-300 bg-white border-[1px] dark:bg-gray-700 ${
          isMe
            ? "rounded-s-xl rounded-se-xl ml-auto"
            : "rounded-e-xl rounded-ss-xl"
        }`}
      >
        <Markdown
          className="prose"
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeSanitize]}
          components={{
            img: ImgComponent, // Use the component definition here
          }}
        >
          {content}
        </Markdown>

        {carousell && (
          <div className="flex -my-10 md:my-0 md:h-fit flex-col items-center justify-center">
            <Carousel
              className="w-fit max-w-sm lg:max-w-md"
              opts={{
                loop: true,
              }}
            >
              <CarouselContent className="flex items-center">
                {carousell.map((item) => (
                  <CarouselItem key={uuidv4()} className="flex justify-center">
                    <div className="text-center">
                      <p>{item.title}</p>
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={ScreenSizes.SMALL}
                        height={ScreenSizes.SMALL}
                      />
                      <p className="max-w-[320px]">{item.description}</p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {carousell.length > 1 && (
                <div>
                  <CarouselPrevious className="left-0" />
                  <CarouselNext className="right-0" />
                </div>
              )}
            </Carousel>
          </div>
        )}
      </div>
    </div>
  );
};
