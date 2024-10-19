import type { BaseVendor } from "@/features/vendors/types/vendor.types";

import { buildServiceUrl, rootApi } from "@/services/index";

const prefix = "/user";

const myVendorPrefix = "/my-vendors";

interface SendUserDataProps {
  email: string;
  firebaseId: string;
  name: string;
}

interface UserResponse {
  user: {
    id: string;
    my_vendors_ids: string[];
  };
  existing: boolean;
}

export type ModifyVendorArrayResponse =
  | AddVendorResponse
  | DeleteVendorResponse;

interface AddVendorResponse {
  result: {
    [key: string]: "Added";
  };
}

interface DeleteVendorResponse {
  result: {
    [key: string]: "Deleted";
  };
}

interface VendorArrayResponse {
  result: BaseVendor[];
}

export interface UserVendorArrayRequest {
  id: string;
  email: string;
  name: string;
  firebaseId: string;
  my_vendors_id: string[];
}

export const userApi = rootApi
  .enhanceEndpoints({ addTagTypes: ["vendors", "users"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      // TODO: Add Response Type
      sendUserData: builder.query<UserResponse, SendUserDataProps>({
        query: (userInfo) => ({
          url: buildServiceUrl(prefix, "/register"),
          method: "POST",
          body: userInfo,
        }),
      }),
      getUserVendors: builder.query<VendorArrayResponse, string>({
        query: (userId) => ({
          url: buildServiceUrl(prefix, `${myVendorPrefix}/${userId}`),
          method: "GET",
        }),
        providesTags: (result, error, userId) =>
          result
            ? [
                ...result.result.map(({ id: vendor_id }) => ({
                  type: "vendors" as const,
                  id: vendor_id,
                })),
                { type: "vendors" as const, id: `USER_${userId}` },
              ]
            : [{ type: "vendors" as const, id: `USER_${userId}` }],
      }),
      addUserVendorArray: builder.mutation<
        AddVendorResponse,
        UserVendorArrayRequest
      >({
        query: (requestBody) => ({
          url: buildServiceUrl(prefix, `${myVendorPrefix}/`),
          method: "POST",
          body: requestBody,
        }),
        invalidatesTags: (result, error, { id }) => [
          { type: "vendors" as const, id: `USER_${id}` },
        ],
      }),
      deleteUserVendorArray: builder.mutation<
        DeleteVendorResponse,
        UserVendorArrayRequest
      >({
        query: (requestBody) => ({
          url: buildServiceUrl(prefix, `${myVendorPrefix}/`),
          method: "DELETE",
          body: requestBody,
        }),
        invalidatesTags: (result, error, { id }) => [
          { type: "vendors" as const, id: `USER_${id}` },
        ],
      }),
    }),
    overrideExisting: false,
  });

export const {
  useLazySendUserDataQuery,
  useLazyGetUserVendorsQuery,
  useAddUserVendorArrayMutation,
  useDeleteUserVendorArrayMutation,
} = userApi;
