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
      // toolIds: ["6ad122d0-c202-402b-9f07-720625c47705"],
      tools: [
        {
          type: "function",
          messages: [
            {
              type: "request-start",
              content:
                "Checking relevant doctor information for the web now. Please wait...",
            },
            {
              type: "request-complete",
              content:
                "I was able to get the relevant doctor information. These are the options available:",
            },
            {
              type: "request-failed",
              content:
                "I'm sorry, I was unable to get the relevant doctor information. Please try again later.",
            },
            {
              type: "request-response-delayed",
              content:
                "I'm sorry, getting the information is taking longer than expected. Please wait a little longer.",
              timingMilliseconds: 2000,
            },
          ],
          function: {
            name: "getDoctorInfo",
            parameters: {
              type: "object",
              properties: {
                user_query: {
                  type: "string",
                },
                user_context: {
                  type: "object",
                },
              },
            },
            description: "Gets relevant doctor information for your condition.",
          },
          async: false,
          server: {
            url: "https://jen-calhacks-backend.onrender.com/search/search",
          },
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

export const vapiPublicKey = "df45e7cf-1fd0-48cd-a803-eccc569d7c09";

export const assistantId = "d92ab147-ec7a-4f62-9fff-82668d1c7401";
