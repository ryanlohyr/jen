import type {
  BaseVendor,
  VendorDataProps,
  VendorMarketPlaceProps,
} from "@/features/vendors/types/vendor.types";
import type { VendorTypes } from "@/features/vendors/types/vendorFilter.types";

import { buildServiceUrl, rootApi } from "@/services/index";

const prefix = "/vendors";
export const vendorPerPage = 20; // static for now

export const vendorApi = rootApi
  .enhanceEndpoints({ addTagTypes: ["vendors", "vendor_categories"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getAllVendorCategories: builder.query<VendorMarketPlaceProps, void>({
        query: () => ({
          url: buildServiceUrl(prefix, "/categories"),
          method: "GET",
        }),
      }),
      getVendorDetail: builder.query<BaseVendor, string>({
        query: (vendorName) => ({
          url: buildServiceUrl(prefix, `/details/${vendorName}`),
          method: "GET",
        }),
        providesTags: (result) =>
          result ? [{ type: "vendors", id: result.id }] : [],
      }),
      getVendorData: builder.query<
        VendorDataProps,
        {
          currentVendor: keyof typeof VendorTypes;
          params: string;
          page: number;
        }
      >({
        query: ({ currentVendor, params, page }) => ({
          url: buildServiceUrl(
            prefix,
            `/types/${currentVendor}?per_page=${vendorPerPage}&page=${page}&${params}`,
          ),
          method: "GET",
        }),
        providesTags: (result) =>
          result
            ? [
                ...result.vendors.map(({ id: vendor_id }) => ({
                  type: "vendors" as const,
                  id: vendor_id,
                })),
                { type: "vendors", id: "LIST" },
              ]
            : [{ type: "vendors", id: "LIST" }],
      }),
    }),
    overrideExisting: false,
  });

export const {
  useGetAllVendorCategoriesQuery,
  useLazyGetAllVendorCategoriesQuery,
  useGetVendorDetailQuery,
  useGetVendorDataQuery,
} = vendorApi;
