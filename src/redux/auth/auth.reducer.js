import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: null,
  loading: false,
  submitLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loading(state) {
      state.loading = true;
    },
    submitLoading(state) {
      state.submitLoading = true;
    },
    loadingDone(state) {
      state.loading = false;
      state.submitLoading = false;
    },
    loginSuccess(state, action) {
      state.auth = action.payload;
    },
    logoutSuccess(state) {
      state.auth = null;
    },
    refreshSuccess(state, action) {
      state.auth = { ...state.auth, tokens: action.payload };
    },
    scoreCalculate(state, action) {
      const testing = action.payload.filter((item) => item.result === true);
      state.auth.user = { ...state.auth.user, score: testing.length };
    },
  },
});

const authReducer = authSlice.reducer;

export const {
  loading,
  submitLoading,
  loadingDone,
  loginSuccess,
  logoutSuccess,
  refreshSuccess,
  scoreCalculate,
} = authSlice.actions;

export default authReducer;
