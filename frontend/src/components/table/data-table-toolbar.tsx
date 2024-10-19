"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import type { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";

export interface FacetedFilterProps {
  columnId: string;
  title: string;
  options: {
    label: string;
    value: string;
    icon?: JSX.Element;
  }[];
}

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterBy: string;
  facetedFilter: FacetedFilterProps[];
}

export function DataTableToolbar<TData>({
  table,
  filterBy,
  facetedFilter,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col flex-1 md:flex-row md:items-center md:space-x-2 md:space-y-0 space-y-2">
        <Input
          placeholder={`Search ${filterBy}...`}
          value={(table.getColumn(filterBy)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(filterBy)?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        <div className="max-w-screen-md flex-wrap space-y-2 md:space-y-0 space-x-2 ">
          {facetedFilter
            .filter((filter) => table.getColumn(filter.columnId))
            .map((filter) => (
              <DataTableFacetedFilter
                key={filter.columnId}
                column={table.getColumn(filter.columnId)!} // assert is safe as it is filtered earlier
                title={filter.title}
                options={filter.options}
              />
            ))}
        </div>
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
