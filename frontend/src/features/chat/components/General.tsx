"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { BeatLoader } from "react-spinners";
import { v4 } from "uuid";
import axios from "axios";
// import { useLazyGetChatQuery } from "@/services/chatAPI";

import ChatStartupPage from "./ChatStartupPage";

import { ChatBubble } from "./chatComponents/ChatBubble";
import { ChatError } from "./chatComponents/ChatError";
import ChatOptions from "./chatComponents/ChatOption";
import { Input } from "./SharedComponents/Input";
import type { ChatBubbleProps, RequestBody } from "./types/chat.schema";
import ChatMic from "./chatComponents/ChatMic";
import Vapi from "@vapi-ai/web";

import {
  initialOptions,
  assistantOptions,
  assistantId,
} from "./assistantConfig";
import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";

interface GeneralProps {
  generalArray: ChatBubbleProps[];
  setGeneralArray: React.Dispatch<React.SetStateAction<ChatBubbleProps[]>>;
}

const vapi = new Vapi(assistantId);
const General = () => {
  // Voice stuff
  const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const { showPublicKeyInvalidMessage, setShowPublicKeyInvalidMessage } =
    usePublicKeyInvalid();

  // This is the texts that are displayed in the chat
  const [generalArray, setGeneralArray] = useState<ChatBubbleProps[]>([]);
  const [chatOptions, setOptions] = useState<string[]>(initialOptions);
  const [loadedVapi, setLoadedVapi] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isNextChatLoading, setIsNextChatLoading] = useState(false);

  const hasSent = useRef(false); // Guard ref
  // const [triggerGetChat, { data: generalData, isError: isGetChatError }] =
  //   useLazyGetChatQuery();
  const searchParams = useSearchParams(); // Use useSearchParams

  const fetchUserProfileData = async () => {
    try {
      const response = await axios.get(
        "http://0.0.0.0:8080/memory/all_memories?user_id=brandon"
      );
      return response.data;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100); // Adjust delay as needed
  }, [generalArray]);

  // hook into Vapi events
  useEffect(() => {
    console.log("SETTING UP THE CALL");
    setLoadedVapi(true);
    vapi.on("call-start", () => {
      console.log("THE CALL STARTED");
      setConnecting(false);
      setConnected(true);
    });

    vapi.on("call-end", () => {
      console.log("THE CALL ENDED");
      setConnecting(false);
      setConnected(false);
    });

    vapi.on("speech-start", () => {
      setAssistantIsSpeaking(true);
    });

    vapi.on("speech-end", () => {
      setAssistantIsSpeaking(false);
    });

    vapi.on("volume-level", (level) => {
      setVolumeLevel(level);
    });

    vapi.on("error", (error) => {
      console.error(error);

      setConnecting(false);
    });

    vapi.on("message", async (msg) => {
      if (msg.type !== "transcript") return;

      console.log("MESSAGE");
      console.log(msg);
      console.log("end");

      if (msg.transcriptType === "partial") {
        // Update UI to show the live partial transcript
        // console.log("PARTIAL")
        // console.log(msg)
      }

      if (msg.transcriptType === "final") {
        // Update UI to show the final transcript
        // console.log("FINAL")
        // console.log(msg.transcript)

        setGeneralArray((prevArray) => {
          const lastMessage = prevArray[prevArray.length - 1];
          if (
            (lastMessage && lastMessage.content === msg.transcript) ||
            msg.transcript === "" ||
            msg.transcript === undefined
          ) {
            return prevArray; // Return the array unchanged if the last message is the same
          }

          return [
            ...prevArray,
            {
              isMe: msg.role === "user",
              content: msg.transcript,
              vendors: undefined,
              carousell: undefined,
            } as ChatBubbleProps,
          ];
        });

        if (
          msg.transcript
            .toLowerCase()
            .includes("i look for the available options")
        ) {
          console.log("STOPPING THE CALL");
          // const apiData = await fetchDataFromAPI();
          // console.log(apiData);
          vapi.stop();
        }
      }
    });

    // we only want this to fire on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleCallInline = async () => {
    if (connected) {
      console.log("STOPPING THE CALL");
      console.log("INLINE");
      vapi.stop();
    } else {
      console.log("STARTING THE CALL");
      setConnecting(true);

      const userProfileData = await fetchUserProfileData();

      vapi.start(assistantOptions(userProfileData) as CreateAssistantDTO);
    }
  };

  // useEffect(() => {
  //   if (!generalData?.content) return;
  //   setIsNextChatLoading(false);
  //   setOptions(generalData.options || []);
  //   setGeneralArray((prevArray) => [
  //     ...prevArray,
  //     {
  //       isMe: generalData.isMe,
  //       content: generalData.content,
  //       carousell: generalData.carousell || undefined,
  //     } as ChatBubbleProps,
  //   ]);
  // }, [generalData, setGeneralArray]);

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
    // triggerGetChat({ userResponse: text } as RequestBody);
    setIsNextChatLoading(true);
  };

  // if (isGetChatError) {
  //   return <ChatError />;
  // }

  return (
    <div className="flex flex-col h-full">
      <div className="grow overflow-y-auto">
        {generalArray.length === 0 && <ChatStartupPage />}
        <ChatMic
          onClick={toggleCallInline}
          connected={connected}
          loadedVapi={loadedVapi}
        />
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

const usePublicKeyInvalid = () => {
  const [showPublicKeyInvalidMessage, setShowPublicKeyInvalidMessage] =
    useState(false);

  // close public key invalid message after delay
  useEffect(() => {
    if (showPublicKeyInvalidMessage) {
      setTimeout(() => {
        setShowPublicKeyInvalidMessage(false);
      }, 3000);
    }
  }, [showPublicKeyInvalidMessage]);

  return {
    showPublicKeyInvalidMessage,
    setShowPublicKeyInvalidMessage,
  };
};

export default General;
