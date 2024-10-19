import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { ReduxState } from "@/lib/redux/store";

export interface UserInfoStateType {
  isAuthLoading: boolean;
  isAuthenticated: boolean;
  access_token: string;
  scope: string;
  onboarded: boolean;
  email: string;
  firebaseId: string;
  username?: string;
  profilePicture?: string;
  userId: string;
  providerType: ProviderType;
  myVendorIds?: string[];
}

export enum ProviderType {
  PASSWORD = "password",
  GOOGLE = "google.com",
  FACEBOOK = "facebook.com",
  NULL = "",
}

const initialState: UserInfoStateType = {
  isAuthLoading: true,
  isAuthenticated: false,
  access_token: "",
  scope: "",
  onboarded: false,
  email: "",
  firebaseId: "",
  username: "",
  userId: "",
  providerType: ProviderType.NULL,
  myVendorIds: [],
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    clear: (state) => {
      state.isAuthLoading = false;
      state.scope = "";
      state.isAuthenticated = false;
      state.access_token = "";
      state.onboarded = false;
      state.email = "";
      state.firebaseId = "";
      state.username = "";
      state.userId = "";
      state.profilePicture = "";
      state.providerType = ProviderType.NULL;
      state.myVendorIds = [];
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.isAuthLoading = action.payload;
    },
    setInfo: (state, action: PayloadAction<UserInfoStateType>) => {
      Object.assign(state, action.payload);
    },
    handleVendorId: (
      state,
      action: PayloadAction<{ id: string; action: "Added" | "Deleted" }>,
    ) => {
      const { id, action: actionType } = action.payload;
      if (actionType === "Added") {
        if (!state?.myVendorIds?.includes(id)) {
          state?.myVendorIds?.push(id);
        }
      } else if (actionType === "Deleted") {
        state.myVendorIds = state.myVendorIds?.filter(
          (vendorId) => vendorId !== id,
        );
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { clear, setInfo, setAuthLoading, handleVendorId } =
  userInfoSlice.actions;
export const userInfoState = (state: ReduxState) => state.userInfo;
export const userInfo = userInfoSlice.reducer;
export const isLoggedIn = (state: ReduxState) =>
  Boolean(state.userInfo.access_token);

// We could combine the selectors into a single selector,
// will see future use cases
// export const getUserAuthInfo = (state: ReduxState) => ({
//   loggedIn: Boolean(state.userInfo.access_token),
//   userInfo: state.userInfo
// });
