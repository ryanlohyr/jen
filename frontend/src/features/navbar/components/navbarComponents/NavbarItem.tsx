/* eslint-disable @typescript-eslint/no-shadow */
// ^ Weird bug where eslint is not recognizing the prop types
import Link from "next/link";
import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TreeLine from "@/components/icons/TreeLine";

import type { CurrentPageStatesType } from "../Navbar_Jen";
import type { NavigationItem } from "../types/navigation.types";

interface NavbarItemProps {
  dropdownItem: NavigationItem;
  currentPageStates: CurrentPageStatesType;
  setSidebarOpen: (value: boolean) => void;
}

function determineClass(
  currentPageStates: CurrentPageStatesType,
  currDropdownItem: NavigationItem,
) {
  let currClass =
    " group flex gap-x-3 rounded-md p-2 text-sm leading-6 justify-start ";
  if (currentPageStates[currDropdownItem.href]) {
    currClass += "bg-primary-foreground text-black underline";
  } else if (
    currDropdownItem.childNav?.some((child) => currentPageStates[child.href])
  ) {
    currClass += " bg-primary-foreground text-black";
  } else {
    currClass += " text-gray-400 hover:bg-primary-foreground";
  }
  return currClass;
}

function determineAccordionClass(
  currentPageStates: CurrentPageStatesType,
  currDropdownItem: NavigationItem,
) {
  let currClass = "w-full ";
  if (currentPageStates[currDropdownItem.href]) {
    currClass += "bg-primary-foreground text-black";
  } else if (
    currDropdownItem.childNav?.some((child) => currentPageStates[child.href])
  ) {
    currClass += " bg-primary-foreground text-black";
  } else {
    currClass += "text-gray-400 hover:bg-primary-foreground";
  }
  return currClass;
}

const NavbarItem = ({
  dropdownItem,
  currentPageStates,
  setSidebarOpen,
}: NavbarItemProps) => {
  return (
    <div>
      {dropdownItem.childNav !== null ? (
        // Navbar items that have child navbar items
        <Accordion
          type="single"
          collapsible
          className={determineAccordionClass(currentPageStates, dropdownItem)}
        >
          <AccordionItem style={{ border: "none" }} value="dropdownItem-1">
            <AccordionTrigger>
              <div className={determineClass(currentPageStates, dropdownItem)}>
                <dropdownItem.icon
                  className={`
                ${
                  currentPageStates[dropdownItem.href]
                    ? "text-black"
                    : "text-gray-400"
                }
                h-6 w-6 shrink-0 
              `}
                  aria-hidden="true"
                />
                {dropdownItem.name}
              </div>
            </AccordionTrigger>
            <div className="max-h-[327px] relative overflow-auto text-container scrollbar-hide ">
              {dropdownItem.childNav?.map((childDropdownItem, index) => {
                return (
                  <AccordionContent key={childDropdownItem.name}>
                    <div className="ml-3 flex items-center">
                      <TreeLine
                        colour={`${
                          currentPageStates[childDropdownItem.href]
                            ? "#9CA3AF"
                            : "#F6F6F6"
                        }`}
                      />
                      <Link
                        onClick={() => setSidebarOpen(false)}
                        href={`/${childDropdownItem.href}`}
                        className={`${
                          currentPageStates[dropdownItem.href]
                            ? "bg-primary-foreground text-black underline"
                            : "text-gray-400 hover:bg-primary-foreground"
                        }
                  hover:underline group flex gap-x-3 rounded-md p-2 text-sm leading-6 justify-start ${
                    index === (dropdownItem.childNav?.length ?? 0) - 1
                      ? "mb-[90px]" // Add margin to the last child item to make it visible
                      : ""
                  }
           `}
                      >
                        {childDropdownItem.name}
                      </Link>
                    </div>
                  </AccordionContent>
                );
              })}
            </div>
          </AccordionItem>
        </Accordion>
      ) : (
        // Navbar items that doesnt have child navbar items
        <Link
          onClick={() => setSidebarOpen(false)}
          href={`/${dropdownItem.href}`}
          className={`${
            currentPageStates[dropdownItem.href]
              ? "bg-primary-foreground text-black"
              : "text-gray-400 hover:bg-primary-foreground"
          }
              group flex gap-x-3 rounded-md p-2 text-sm leading-6 justify-start
            `}
        >
          <dropdownItem.icon
            className={`
                ${
                  currentPageStates[dropdownItem.href]
                    ? "text-black"
                    : "text-gray-400"
                }
                h-6 w-6 shrink-0
              `}
            aria-hidden="true"
          />
          {dropdownItem.name}
        </Link>
      )}
    </div>
  );
};

export default NavbarItem;
