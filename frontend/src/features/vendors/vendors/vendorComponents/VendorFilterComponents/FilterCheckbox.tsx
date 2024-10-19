import React from "react";

import { ChevronDownIcon } from "@heroicons/react/24/solid";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FilterCheckboxProps {
  title: string;
  options: string[];
  selectedOptions: string[];
  onOptionToggle: (title: string, option: string) => void;
}
const FilterCheckbox = ({
  title,
  options,
  selectedOptions,
  onOptionToggle,
}: FilterCheckboxProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-3xl">
          <div className="flex">
            {title}
            <ChevronDownIcon className="ml-2 mt-[2px] h-4 w-4" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            key={option}
            checked={selectedOptions?.includes(option)}
            onCheckedChange={() => onOptionToggle(title, option)}
          >
            {option}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterCheckbox;
