export const assistantOptions = (userProfile) => {
  return {
    name: "Vapi’s Pizza Front Desk",
    firstMessage: "Vappy’s Hospital Booking Assistant, how can I help you?",
    transcriber: {
      provider: "deepgram",
      model: "nova-2",
      language: "en-US",
    },
    voice: {
      provider: "playht",
      voiceId: "jennifer",
    },
    model: {
      provider: "openai",
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are helpful assistant that talks about anything under the sk, this is the users current profile
          ${JSON.stringify(userProfile)}
          `,
        },
      ],
      toolIds: ["6ad122d0-c202-402b-9f07-720625c47705"],
    },
  };
};

export const initialOptions = [
  "What exercises can I do to improve my mobility?",
  "Help me order groceries for delivery.",
  "Book a medical appointment with my doctor for next week.",
];

export const vapiPublicKey = "df45e7cf-1fd0-48cd-a803-eccc569d7c09";

export const assistantId = "d92ab147-ec7a-4f62-9fff-82668d1c7401";
