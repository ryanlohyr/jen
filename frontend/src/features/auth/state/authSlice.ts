import { createSlice } from "@reduxjs/toolkit";

import type { ReduxState } from "@/lib/redux";

const authPopupSlice = createSlice({
  name: "authPopup",
  initialState: {
    open: false,
  },
  reducers: {
    showAuthPopup: (state) => {
      state.open = true;
    },
    hideAuthPopup: (state) => {
      state.open = false;
    },
  },
});

export const isAuthPopupOpen = (state: ReduxState) => state.authPopup.open;
export const { showAuthPopup, hideAuthPopup } = authPopupSlice.actions;
export const authPopup = authPopupSlice.reducer;
