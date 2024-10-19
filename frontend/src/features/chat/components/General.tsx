"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { BeatLoader } from "react-spinners";
import { v4 } from "uuid";

import { useLazyGetChatQuery } from "@/services/chatAPI";

import ChatStartupPage from "./ChatStartupPage";

import { ChatBubble } from "./chatComponents/ChatBubble";
import { ChatError } from "./chatComponents/ChatError";
import ChatOptions from "./chatComponents/ChatOption";
import { Input } from "./SharedComponents/Input";
import type { ChatBubbleProps, RequestBody } from "./types/chat.schema";

const initialOptions = [
  "What exercises can I do to improve my mobility?",
  "Help me order groceries for delivery.",
  "Book a medical appointment with my doctor for next week.",
];

interface GeneralProps {
  generalArray: ChatBubbleProps[];
  setGeneralArray: React.Dispatch<React.SetStateAction<ChatBubbleProps[]>>;
}

const General = ({ generalArray, setGeneralArray }: GeneralProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chatOptions, setOptions] = useState<string[]>(initialOptions);
  const [isNextChatLoading, setIsNextChatLoading] = useState(false);
  const hasSent = useRef(false); // Guard ref

  const [triggerGetChat, { data: generalData, isError: isGetChatError }] =
    useLazyGetChatQuery();
  const searchParams = useSearchParams(); // Use useSearchParams

  useEffect(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100); // Adjust delay as needed
  }, [generalArray]);

  useEffect(() => {
    if (!generalData?.content) return;
    setIsNextChatLoading(false);
    setOptions(generalData.options || []);
    setGeneralArray((prevArray) => [
      ...prevArray,
      {
        isMe: generalData.isMe,
        content: generalData.content,
        carousell: generalData.carousell || undefined,
      } as ChatBubbleProps,
    ]);
  }, [generalData, setGeneralArray]);

  const sendButtonPressed = (text: string) => {
    console.log("sendButtonPressed called with:", text);
    if (!text) return;
    setGeneralArray((prevArray) => [
      ...prevArray,
      {
        isMe: true,
        content: text,
        vendors: undefined,
        carousell: undefined,
      } as ChatBubbleProps,
    ]);
    triggerGetChat({ userResponse: text } as RequestBody);
    setIsNextChatLoading(true);
  };

  useEffect(() => {
    if (hasSent.current) {
      console.log("Effect blocked by guard.");
      return; // Guard check
    }

    const input = searchParams.get("input"); // Get input from query params
    console.log("useEffect triggered. Input from search params:", input);

    if (input) {
      sendButtonPressed(input);
      hasSent.current = true; // Set guard after sending
    }
  }, [searchParams]);

  if (isGetChatError) {
    return <ChatError />;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="grow overflow-y-auto">
        {generalArray.length === 0 && <ChatStartupPage />}
        {generalArray.length > 0 && (
          <div className="flex flex-col overflow-x-hidden">
            {generalArray.map((chat) => (
              <div
                className={!chat.isMe ? "transition animate-fade-in-down" : ""}
                key={v4()}
              >
                <ChatBubble
                  isMe={chat.isMe}
                  content={chat.content}
                  carousell={chat.carousell}
                />
              </div>
            ))}
            {isNextChatLoading && (
              <BeatLoader size={10} color="#FF477E" speedMultiplier={0.5} />
            )}
            {/* Ref pulls the viewport to the bottom */}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      <div className="flex-none">
        <ChatOptions
          sendButtonPressed={sendButtonPressed}
          options={chatOptions}
        />
      </div>
      <div className="font-worksans flex-none">
        <Input
          sendButtonPressed={sendButtonPressed}
          isDisabled={isNextChatLoading}
        />
      </div>
    </div>
  );
};

export default General;
