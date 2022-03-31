import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: "",
  refreshToken: "",
  isLoggedIn: false,
  user: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.accessToken = action.payload.tokens.access.token;
      state.refreshToken = action.payload.tokens.refresh.token;
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    logoutSuccess(state) {
      state.accessToken = "";
      state.refreshToken = "";
      state.isLoggedIn = false;
      state.user = {};
    },
    refreshSuccess(state, action) {
      state.accessToken = action.payload.access.token;
      state.refreshToken = action.payload.refresh.token;
    },
  },
});

const authReducer = authSlice.reducer;

export const { loginSuccess, logoutSuccess, refreshSuccess } =
  authSlice.actions;

export default authReducer;
