// app/not-found.tsx

import Errors from "@/components/Errors";

const NotFound = () => {
  return (
    <div>
      <Errors errorType="pageNotFound" />
    </div>
  );
};

export default NotFound;
