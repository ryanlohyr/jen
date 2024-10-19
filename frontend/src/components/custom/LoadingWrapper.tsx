import type { ReactNode } from "react";
import React from "react";

import Errors from "@/components/Errors";
import Loading from "@/components/Loading";

type Props = {
  isLoading?: boolean;
  isError?: boolean;
  children: ReactNode;
  errorType: string;
};

function LoadingWrapper({ isLoading, isError, children, errorType }: Props) {
  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Errors errorType={errorType} />;
  }

  return <div>{children}</div>;
}

export default LoadingWrapper;
