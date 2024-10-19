"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";

import { VendorTypes } from "../../types/vendorFilter.types";

interface VendorPopoverProps {
  currentVendor: keyof typeof VendorTypes;
}

const VendorPopover = ({ currentVendor }: VendorPopoverProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(currentVendor);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          data-testid="special-button"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {VendorTypes[value]?.title
            ? VendorTypes[value]?.title
            : "Search Vendor..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search vendor..." />
          <CommandEmpty>No Vendor Found.</CommandEmpty>
          <CommandGroup>
            {Object.entries(VendorTypes).map((vendor) => {
              const vendorKey = vendor[0];
              const vendorValue = vendor[1];
              return (
                <Link key={vendorKey} href={`${vendorKey}`}>
                  <CommandItem
                    key={vendorKey}
                    value={vendorKey}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === vendorKey ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {vendorValue.title}
                  </CommandItem>
                </Link>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default VendorPopover;
