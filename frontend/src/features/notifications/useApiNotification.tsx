import { useEffect } from "react";

import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

import ToastBuilder from "@/features/notifications/ToastBuilder";

type UseApiNotificationsConfig = {
  isSuccess?: boolean;
  successAction?: () => void;
  isError?: boolean;
  error?: FetchBaseQueryError | SerializedError;
  successMessage?: string;
  errorMessage?: string;
  error404Message?: string;
  error409Message?: string;
};

export const useApiNotifications = ({
  isSuccess,
  successAction,
  isError,
  error,
  successMessage = "Success",
  errorMessage = "An unexpected error occurred!",
  error404Message = "Item was not found!",
  error409Message = "Item is already present!",
}: UseApiNotificationsConfig) => {
  useEffect(() => {
    if (isSuccess) {
      ToastBuilder.success(successMessage).send();
      if (successAction) {
        successAction();
      }
    } else if (isError) {
      if (error && "status" in error) {
        console.error(error);
        if (error.status === 404) {
          ToastBuilder.error(error404Message).send();
          return;
        }
        if (error.status === 409) {
          ToastBuilder.error(error409Message).send();
          return;
        }
      }
      ToastBuilder.error(errorMessage).send();
    }
  }, [
    isError,
    isSuccess,
    successMessage,
    errorMessage,
    error404Message,
    error409Message,
    error,
  ]);
};
