import type { FormResponseType, HelpResponseType } from "@/features/landing";

import { rootApi } from "@/services/index";

const waitingListLambdaUrl =
  "https://4oaoby4zcm3cqw3guh4ctr5pmq0qztsc.lambda-url.ap-southeast-2.on.aws/";

const helpLambdaUrl =
  "https://etklgdc4dxopkh5biinkkwr22q0gpvwv.lambda-url.ap-southeast-1.on.aws/";
export const formApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    postWaitingListResponse: build.mutation<FormResponseType, FormResponseType>(
      {
        query: (response) => ({
          url: waitingListLambdaUrl,
          method: "POST",
          body: response,
        }),
      },
    ),
    postHelpResponse: build.mutation<void, HelpResponseType>({
      query: (response) => ({
        url: helpLambdaUrl,
        method: "POST",
        body: response,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  usePostWaitingListResponseMutation,
  usePostHelpResponseMutation,
} = formApi;
