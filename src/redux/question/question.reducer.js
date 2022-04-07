import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
  loading: false,
};

const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    getQuestionSuccess(state, action) {
      state.questions = action.payload;
    },
    loading(state) {
      state.loading = true;
    },
    loadingDone(state) {
      state.loading = false;
    },
  },
});

const questionReducer = questionSlice.reducer;

export const { getQuestionSuccess, loading, loadingDone } =
  questionSlice.actions;

export default questionReducer;
