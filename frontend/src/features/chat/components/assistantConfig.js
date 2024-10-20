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
    },
  };
};

export const initialOptions = [
  "What exercises can I do to improve my mobility?",
    "Help me order groceries for delivery.",
    "Book a medical appointment with my doctor for next week.",
  ];

export const assistantId = "df45e7cf-1fd0-48cd-a803-eccc569d7c09";