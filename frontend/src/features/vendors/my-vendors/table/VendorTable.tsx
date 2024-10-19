"use client";

import { DataTable } from "@/components/table/data-table";
import type { FacetedFilterProps } from "@/components/table/data-table-toolbar";

import type { BaseVendor } from "../../types/vendor.types";
import { categories, rating } from "../types/facets";
import { columns } from "./columns";

type Props = {
  vendors: BaseVendor[] | undefined;
};

const facetedFilter: FacetedFilterProps[] = [
  {
    columnId: "vendor_type",
    title: "Category",
    options: categories,
  },
  {
    columnId: "rating",
    title: "Ratings",
    options: rating,
  },
  // Status Removed for now
  // {
  //   columnId: "status",
  //   title: "Status",
  //   options: statuses,
  // },
];
export const VendorTable = ({ vendors }: Props) => {
  console.log(facetedFilter[0].options);
  return (
    <div className="">
      {vendors ? (
        <DataTable
          columns={columns}
          data={vendors}
          filterBy="name"
          facetedFilter={facetedFilter}
        />
      ) : null}
    </div>
  );
};
