"use client";

import Link from "next/link";

import type { ColumnDef } from "@tanstack/react-table";

import { formatPriceToThousand } from "@/utils/stringValidators";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ImageWrapper from "@/components/custom/ImageWrapper";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";

import type { BaseVendor } from "../../types/vendor.types";
import { ImageCarouselPopup } from "../ImageCarouselPopup";
import { categories, rating } from "../types/facets";
import { DataTableRowActions } from "./row-action";

interface Photo {
  src: string;
  width: number;
  height: number;
  // add other properties if needed
}

export const columns: ColumnDef<BaseVendor>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vendor Name" />
    ),
    cell: ({ row }) => (
      <Link href={`/vendors/details/${row.getValue("name")}`}>
        <div className="w-[120px]">{row.getValue("name")}</div>
      </Link>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "photos",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Photos" />
    ),
    cell: ({ row }) => {
      const data = row.getValue("photos") as Photo[];
      const filteredData = data.filter((x) => x.src !== "");
      console.log(filteredData);
      return (
        <div className="w-[120px]">
          {filteredData.length > 0 ? (
            <ImageCarouselPopup
              title={row.original.name}
              images={row.getValue("photos")}
            />
          ) : (
            <ImageWrapper src="" alt="" className="w-[120px] h-[120px]" />
          )}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => (
      <div className="w-[120px]">{row.getValue("address")}</div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => (
      <div className="w-[120px] break-words">{row.getValue("email")}</div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "vendor_type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      console.log(row.getValue("vendor_type"));
      const category = categories.find(
        (c) => c.value === row.getValue("vendor_type"),
      );

      return category?.icon;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "rating",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ratings" />
    ),
    cell: ({ row }) => {
      const foundRating = rating.find(
        (r) => (row.getValue("rating") as number) >= Number(r.value),
      );
      if (!foundRating) {
        return null;
      }
      return (
        <div className="flex w-[100px] items-center">
          {foundRating.icon}
          <span>{`${row.getValue("rating") || "-"} (${
            row.original.rating_count || "-"
          })`}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return (
        Math.min(...value.map((element: string) => parseInt(element, 10))) <=
        Number(row.getValue(id))
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "min_price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price Range" />
    ),
    cell: ({ row }) => {
      const minPrice = row.getValue("min_price") as number;
      const maxPrice = row.original.max_price;

      /* Base Price is fall backvalue */
      const priceType = row.original.price_type || "Base Price";
      let priceText = "";
      if (minPrice && maxPrice) {
        priceText = `From ${formatPriceToThousand(
          minPrice,
        )} to ${formatPriceToThousand(maxPrice)}`;
      } else if (minPrice) {
        priceText = `Starts at ${formatPriceToThousand(minPrice)}`;
      } else if (maxPrice) {
        priceText = `Up to ${formatPriceToThousand(maxPrice)}`;
      } else {
        priceText = "Prices currently not available";
      }

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <p className="text-sm ">{priceText}</p>
            </TooltipTrigger>
            <TooltipContent>{priceType}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
  // To Be confirmed at a later date

  // {
  //   accessorKey: "priceQuote",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Price Quote" />
  //   ),
  //   cell: ({ row }) => (
  //     <div className="w-[100px]">{`$${row.getValue("priceQuote")}` ?? "-"}</div>
  //   ),
  //   enableSorting: true,
  //   enableHiding: true,
  // },
  // {
  //   accessorKey: "status",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Status" />
  //   ),
  //   cell: ({ row }) => {
  //     const status = statuses.find(
  //       (state) => state.value === row.getValue("status"),
  //     );

  //     if (!status) {
  //       return null;
  //     }

  //     return status.icon;
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  //   enableSorting: false,
  //   enableHiding: true,
  // },
];
