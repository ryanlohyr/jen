import React from "react";

import LoadingComponent from "./ui/loading";

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <div className="flex gap-2 items-center justify-center">
        <p className="">Loading...</p>
        <LoadingComponent />
      </div>
    </div>
  );
}

export default Loading;
