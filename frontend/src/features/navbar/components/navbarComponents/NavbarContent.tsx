"use client";

import { LogIn, LogOut, MessageSquare, Users } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { signOutUser } from "@/features/auth/components/authService";
import { showAuthPopup } from "@/features/auth/state/authSlice";
import { isLoggedIn } from "@/features/auth/state/userInfoSlice";
import { VendorTypes } from "@/features/vendors/types/vendorFilter.types";

import type {
  ChildNavigationItem,
  NavigationItem,
} from "../types/navigation.types";
import NavbarItem from "./NavbarItem";

import { environmentConfig } from "@/environments/config";

export interface CurrentPageStatesType {
  [key: string]: boolean;
}

const settings = [
  // Remove settings for now
  // { name: "Settings", href: "settings", icon: Settings },
];

const childVendors: ChildNavigationItem[] = [
  {
    name: "All Vendors",
    href: "vendors",
  },
  ...Object.entries(VendorTypes).map(([key, value]) => {
    return {
      name: value.title,
      href: `vendors/${key}`,
    };
  }),
];

export const navigation: NavigationItem[] = [
  { name: "Memories", href: "memories", icon: Users, childNav: null },
  { name: "Chat", href: "chat", icon: MessageSquare, childNav: null },
];

interface ContentProps {
  setSidebarOpen: (value: boolean) => void;
  currentPageStates: CurrentPageStatesType;
}

const NavbarContent = ({ setSidebarOpen, currentPageStates }: ContentProps) => {
  const loggedIn = useSelector(isLoggedIn);
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    await signOutUser();
  };

  const handleSignIn = () => {
    dispatch(showAuthPopup());
  };

  return (
    <div className="flex grow flex-col gap-y-3 overflow-y-auto border-r border-gray-200 bg-white px-5 min-h-screen">
      <div className="flex w-full items-center justify-start my-3">
        <Link href="/">
          {/* <img
            className="w-[30px] mr-2 cursor-pointer"
            src="/jouvireLogo.svg"
            alt="Luna Logo"
          /> */}
        </Link>
        <div>
          <h1 className="font-bold text-lg">Jem</h1>
          <p className="text-gray-400 font-extralight text-xs">
            Your personal assistant
          </p>
        </div>
      </div>
      <Separator />
      <nav className="flex flex-1 flex-col gap-y-4">
        <ul className="flex flex-col gap-y-2">
          <li>
            <p className="text-gray-400 font-medium text-xs -my-1">MAIN</p>
          </li>
          <li>
            <ul className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <NavbarItem
                    setSidebarOpen={setSidebarOpen}
                    dropdownItem={item}
                    currentPageStates={currentPageStates}
                  />
                </li>
              ))}
            </ul>
          </li>
        </ul>
        <Separator />
        <ul className="flex flex-col gap-y-2">
          <li>
            <ul className="-mx-2 space-y-1">
              {settings.map((item) => (
                <li key={item.name}>
                  <Link
                    href={`/${item.href}`}
                    className={`${
                      currentPageStates[item.href]
                        ? "bg-primary-foreground text-black"
                        : "text-gray-400 hover:bg-primary-foreground"
                    }
                          group flex gap-x-3 rounded-md p-2 text-sm leading-6 justify-start
                        `}
                  >
                    <item.icon
                      className={`
                            ${
                              currentPageStates[item.href]
                                ? "text-black"
                                : "text-gray-400"
                            }
                            h-6 w-6 shrink-0
                          `}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                </li>
              ))}
              <li className="text-primary">
                {loggedIn ? (
                  <Button
                    onClick={handleSignOut}
                    variant="raw"
                    className="group flex gap-x-3 rounded-md p-2 text-sm leading-6 justify-start w-full"
                  >
                    <LogOut
                      className={`h-6 w-6 shrink-0 `}
                      aria-hidden="true"
                    />
                    Logout
                  </Button>
                ) : (
                  <Button
                    onClick={handleSignIn}
                    variant="raw"
                    className="group flex gap-x-3 rounded-md p-2 text-sm leading-6 justify-start w-full"
                  >
                    <LogIn className={`h-6 w-6 shrink-0 `} aria-hidden="true" />
                    Login
                  </Button>
                )}
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavbarContent;
