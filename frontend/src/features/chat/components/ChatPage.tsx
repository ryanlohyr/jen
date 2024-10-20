"use client";

import React, { useState } from "react";

import General from "./General";

import type { ChatBubbleProps } from "./types/chat.schema";

export const ChatPage = () => {
  const [generalArray, setGeneralArray] = useState<ChatBubbleProps[]>([]);

  return (
    <div className="flex flex-col h-screen w-full bg-primary-foreground px-6 pt-6 pb-3 ">
      <div className="grow flex flex-col overflow-y-auto">
        <General
          generalArray={generalArray}
          setGeneralArray={setGeneralArray}
        />
      </div>
    </div>
  );
};
