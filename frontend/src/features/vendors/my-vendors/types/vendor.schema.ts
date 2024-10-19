import { z } from "zod";

import { VendorKeys } from "../../types/vendorFilter.types";

const categoryEnumArray = Object.values(VendorKeys).map(({ value }) => value);
const categoryEnumTuple = [categoryEnumArray[0], ...categoryEnumArray.slice(1)];

const photoSchema = z.object({
  src: z.string(),
  width: z.number(),
  height: z.number(),
});

const vendorSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string().nullable(),
  photos: z.array(photoSchema),
  email: z.string().nullable(),
  vendor_type: z.enum(categoryEnumTuple as [string, ...string[]]),
  rating: z.number().nullable(),
  rating_count: z.number().nullable(),
  // Commented out for now, may use in the future
  // priceQuote: z.number(),
  // priceRange: z.array(z.string()),
  // status: z.enum([
  //   "Finalised quote",
  //   "Out of budget",
  //   "Contacting",
  //   "Unavailable",
  // ]),
});

export type Vendor = z.infer<typeof vendorSchema>;

export { vendorSchema };
