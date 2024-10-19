"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Dialog, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import { Button } from "@/components/ui/button";

import { showAuthPopup } from "@/features/auth/state/authSlice";
import { isLoggedIn } from "@/features/auth/state/userInfoSlice";

import { environmentConfig } from "@/environments/config";

export const LandingNavBarNew = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(isLoggedIn);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleSignIn = () => {
    dispatch(showAuthPopup());
  };
  return (
    <div className="w-full bg-white/70 sticky top-0 z-30 backdrop-blur-md">
      {/* ==========MOBILE NAV BAR============== */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col overflow-y-auto bg-white px-6 pb-2">
                  <Link href="/">
                    <div className="w-full items-center justify-start my-3">
                      <Image
                        priority
                        src="/jouvire.svg"
                        alt="jouvire"
                        width={80}
                        height={75}
                        className="text-lunaPink"
                      />
                      <p className="mt-1 font-worksans text-gray-400 font-extralight text-xs">
                        Your AI Wedding Planner
                      </p>
                    </div>
                  </Link>

                  <nav className="flex flex-1 flex-col gap-y-4">
                    <ul className="-mx-2 space-y-1">
                      <li className="">
                        <Link
                          href="/vendors"
                          className="font-worksans group flex gap-x-3 rounded-md p-2 text-sm leading-6 justify-start hover:bg-gray-100"
                        >
                          Vendor
                        </Link>
                      </li>
                      <li className="">
                        <Link
                          href="/chat"
                          className="font-worksans group flex gap-x-3 rounded-md p-2 text-sm leading-6 justify-start hover:bg-gray-100"
                        >
                          AI Planner
                        </Link>
                      </li>
                      <li className="">
                        {loggedIn ? (
                          <Link href="/vendors">
                            <Button
                              variant="primaryPurple"
                              size="sm"
                              className="bg-lunaPink mt-3"
                              type="button"
                            >
                              Dashboard
                            </Button>
                          </Link>
                        ) : (
                          <Button
                            variant="primaryPurple"
                            size="sm"
                            className="bg-lunaPink mt-3"
                            onClick={handleSignIn}
                          >
                            Get Started
                          </Button>
                        )}
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* ==========DESKTOP NAV BAR============== */}
      {/* Removed mobile responsve for now since there's only one button */}
      {/* <nav className="hidden lg:flex w-full h-16 "> */}
      <nav className="hidden lg:flex w-full h-16 bg-white shadow">
        <div className="w-full flex flex-row mx-auto  py-4 px-2 sm:px-6 lg:px-8 items-center justify-between">
          <div className="flex flex-row items-center space-x-8">
            <Link href="/">
              <div className="flex ml-2">
                <Image
                  priority
                  src="/jouvire.svg"
                  alt="jouvire"
                  width={80}
                  height={75}
                  className="text-lunaPink"
                />
              </div>
            </Link>
            <Link href="/vendors">
              <h1 className="text-sm font-worksans">Vendor</h1>
            </Link>
            <Link href="/chat">
              <h1 className="text-sm font-worksans">AI Planner</h1>
            </Link>
            <Link target="_blank" href={environmentConfig.vendorSignUpUrl}>
              <h1 className="text-sm font-worksans">Jouvire for vendors</h1>
            </Link>
          </div>

          <div className="flex flex-row items-center space-x-4">
            {loggedIn ? (
              <Link href="/vendors">
                <Button
                  variant="primaryPurple"
                  size="sm"
                  className="bg-lunaPink"
                  type="button"
                >
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Button
                variant="primaryPurple"
                size="sm"
                className="bg-lunaPink"
                onClick={handleSignIn}
              >
                Get Started
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Removed mobile responsve for now since there's only one button */}
      <div className="lg:hidden sticky top-0 z-40 w-full flex items-center bg-white p-4 shadow-sm sm:px-6">
        <div className="flex w-full relative items-center justify-center">
          <div className="absolute left-0">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div>
            <Link href="/">
              <div className="flex flex-row items-center justify-center gap-x-2">
                <Image
                  priority
                  src="/jouvire.svg"
                  alt="jouvire"
                  width={80}
                  height={75}
                  className="text-lunaPink"
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
