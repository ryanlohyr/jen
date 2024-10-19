// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { ReduxState } from "@/lib/redux/store";

import { environmentConfig } from "@/environments/config";

const getEnvironmentUrl = () => {
  return environmentConfig.backendUrl;
};

export const buildServiceUrl = (prefix: string, query: string) => {
  return `${getEnvironmentUrl()}${prefix}${query}`;
};

// initialize an empty api service that we'll inject endpoints into later as needed
export const rootApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://",
    prepareHeaders: (headers, { getState }) => {
      // @ts-expect-error Weird TS stuff
      const token = (getState() as ReduxState).userInfoSlice?.access_token;
      if (token && token.length > 0) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
