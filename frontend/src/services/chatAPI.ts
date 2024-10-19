import type {
  RequestBody,
  RequestOutput,
} from "@/features/chat/components/types/chat.schema";

// commenting out this code because we are voiding the Jouvire4U service for MVP
// import type { OnboardingFormSchema } from "@/features/chat/components/types/jouvire4u.schema";
import { buildServiceUrl, rootApi } from "@/services/index";

const prefix = "/chat";

export const chatApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    // getChat: build.query<ChatBubbleProps, string>({
    //   query: (query) => buildServiceUrl(prefix, `/chat?query=${query}`),
    // }),
    getChat: build.query<RequestOutput, RequestBody>({
      query: (args: RequestBody) => {
        return {
          url: buildServiceUrl(prefix, `/chat`),
          method: "POST",
          body: args,
          credentials: "include",
        };
      },
    }),
    // commenting out this code because we are voiding the Jouvire4U service for MVP
    // getInterviewResult: build.query<RequestOutput, OnboardingFormSchema>({
    //   query: (args: OnboardingFormSchema) => {
    //     return {
    //       url: buildServiceUrl(prefix, `/interview_result`),
    //       method: "POST",
    //       body: args,
    //       credentials: "include",
    //     };
    //   },
    // }),
    // getInterviewFollowUp: build.query<RequestOutput, RequestBody>({
    //   query: (args: RequestBody) => {
    //     return {
    //       url: buildServiceUrl(prefix, `/interview_follow_up`),
    //       method: "POST",
    //       body: args,
    //       credentials: "include",
    //     };
    //   },
    // }),
  }),

  overrideExisting: false,
});

export const {
  useLazyGetChatQuery,
  // commenting out this code because we are voiding the Jouvire4U service for MVP
  // useLazyGetInterviewResultQuery,
  // useLazyGetInterviewFollowUpQuery,
} = chatApi;
