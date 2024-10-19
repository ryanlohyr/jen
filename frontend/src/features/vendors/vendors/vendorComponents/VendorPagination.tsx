import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

import { vendorPerPage } from "@/services/vendorAPI";

interface VendorPaginationProps {
  currPage: number;
  setCurrPage: (page: number) => void;
  totalPages: number;
  totalVendors: number;
}

const VendorPagination = ({
  currPage,
  setCurrPage,
  totalPages,
  totalVendors,
}: VendorPaginationProps) => {
  const start = (currPage - 1) * vendorPerPage + 1;
  const end = Math.min(currPage * vendorPerPage, totalVendors);

  /**
   * Generates the pagination items based on the current page and total number of pages.
   * Adds ellipsis to indicate the presence of more pages when the total number of pages exceeds 4.
   *
   * @returns {JSX.Element[]} An array of JSX elements representing the pagination items.
   */
  const getPages = (): JSX.Element[] => {
    const pages = [];
    const ellipsis = <PaginationEllipsis />;

    const createPageItem = (page: number): JSX.Element => (
      <PaginationItem key={uuidv4()}>
        <PaginationLink
          className=""
          onClick={() => setCurrPage(page)}
          isActive={currPage === page}
        >
          {page}
        </PaginationLink>
      </PaginationItem>
    );

    // If the total number of pages is 4 or less, display all page numbers.
    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i += 1) {
        pages.push(createPageItem(i));
      }
      return pages;
    }

    // If the current page is near the beginning, show the first few pages, ellipsis, and the last page.
    if (currPage <= 2) {
      for (let i = 1; i <= 3; i += 1) {
        pages.push(createPageItem(i));
      }
      pages.push(ellipsis);
      pages.push(createPageItem(totalPages));
    }
    // If the current page is near the end, show the first page, ellipsis, and the last few pages.
    else if (currPage >= totalPages - 1) {
      pages.push(createPageItem(1));
      pages.push(ellipsis);
      for (let i = totalPages - 2; i <= totalPages; i += 1) {
        pages.push(createPageItem(i));
      }
    }
    // If the current page is in the middle, show the first page, ellipsis, current page, ellipsis, and the last page.
    else {
      pages.push(createPageItem(1));
      pages.push(ellipsis);
      pages.push(createPageItem(currPage - 1));
      pages.push(ellipsis);
      pages.push(createPageItem(totalPages));
    }

    return pages;
  };

  return (
    <Pagination className="flex flex-col sm:flex-row justify-between items-center">
      <p className="mt-2 sm:mt-0 order-2 sm:order-1 w-full text-center sm:text-left">
        Showing {start} - {end} out of {totalVendors}
      </p>
      <PaginationContent className="order-1 sm:order-2 flex flex-wrap sm:flex-none">
        <PaginationItem key={uuidv4()}>
          <Button
            onClick={() => setCurrPage(currPage - 1)}
            variant="ghost"
            disabled={currPage === 1}
          >
            <ChevronLeft className="h-5 w-5" /> Previous
          </Button>
        </PaginationItem>
        {getPages()}
        <PaginationItem key={uuidv4()}>
          <Button
            onClick={() => setCurrPage(currPage + 1)}
            variant="ghost"
            disabled={currPage === totalPages}
          >
            Next <ChevronRight className="h-5 w-5" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default VendorPagination;
