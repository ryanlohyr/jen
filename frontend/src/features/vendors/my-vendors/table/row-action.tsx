"use client";

import { Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import type { Row } from "@tanstack/react-table";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  handleVendorId,
  isLoggedIn,
  userInfoState,
} from "@/features/auth/state/userInfoSlice";

import type { UserVendorArrayRequest } from "@/services/userAPI";
import { useDeleteUserVendorArrayMutation } from "@/services/userAPI";

import { setRefreshUserVendors } from "../state/myVendorSlice";
import { vendorSchema } from "../types/vendor.schema";

import { isAddVendorSuccessful } from "@/hooks/vendors/useVendorLike";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const vendor = vendorSchema.parse(row.original);
  const router = useRouter();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const loggedIn = useSelector(isLoggedIn);
  const userInfo = useSelector(userInfoState);
  const dispatch = useDispatch();

  const [
    triggerDeleteUserVendorArrayMutation,
    { isLoading, isError, isSuccess },
  ] = useDeleteUserVendorArrayMutation();
  const deleteVendor = async () => {
    if (!loggedIn) {
      return;
    }

    const requestBody: UserVendorArrayRequest = {
      id: userInfo.userId,
      my_vendors_id: [vendor.id],
      email: userInfo.email,
      name: userInfo.username ?? "",
      firebaseId: userInfo.firebaseId,
    };

    const response = await triggerDeleteUserVendorArrayMutation(requestBody);

    if (!isAddVendorSuccessful(response, "Deleted", vendor.name, vendor.id)) {
      return;
    }

    dispatch(setRefreshUserVendors(true));
    dispatch(handleVendorId({ id: vendor.id.toString(), action: "Deleted" }));

    setOpenDeleteDialog(false);
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem>
            <Link href={`/vendors/details/${vendor.name}`}>
              View detail page
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex gap-1 items-center w-full cursor-pointer"
            onClick={() => setOpenDeleteDialog(true)}
          >
            Delete
            <Trash className="size-4" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you absolutely sure you want to delete {vendor.name} from your
              vendor list?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteVendor}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
