import { authPopup } from "@/features/auth/state/authSlice";

import { rootApi } from "@/services";

import { userInfo } from "../../features/auth/state/userInfoSlice";
import { myVendorRefresh } from "../../features/vendors/my-vendors/state/myVendorSlice";

export const reducer = {
  [rootApi.reducerPath]: rootApi.reducer,
  userInfo,
  myVendorRefresh,
  authPopup,
};
