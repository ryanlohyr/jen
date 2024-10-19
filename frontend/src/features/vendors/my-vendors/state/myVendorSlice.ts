// features/vendors/state/refreshSlice.js
import { createSlice } from "@reduxjs/toolkit";

import type { ReduxState } from "@/lib/redux/store";

const initialState: { refreshUserVendors: boolean } = {
  refreshUserVendors: false,
};

export const refreshSlice = createSlice({
  name: "myVendorRefresh",
  initialState,
  reducers: {
    setRefreshUserVendors: (state, action) => {
      state.refreshUserVendors = action.payload;
    },
  },
});

export const { setRefreshUserVendors } = refreshSlice.actions;
export const refreshVendorState = (state: ReduxState) =>
  state.myVendorRefresh.refreshUserVendors;
export const myVendorRefresh = refreshSlice.reducer;
export default refreshSlice.reducer;
