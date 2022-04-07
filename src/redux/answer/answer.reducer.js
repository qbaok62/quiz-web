import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  answers: [],
};

const answerSlice = createSlice({
  name: "answers",
  initialState,
  reducers: {
    saveAnswer(state, action) {
      const newAnswer = action.payload;
      const existingAnswser = state.answers.find(
        (oldAnswer) => oldAnswer.id === newAnswer.id
      );
      if (!existingAnswser) {
        state.answers.push({
          id: newAnswer.id,
          correctanswer: newAnswer.answer,
        });
      } else {
        state.answers.map((obj) =>
          obj.id === newAnswer.id ? (obj.correctanswer = newAnswer.answer) : obj
        );
      }
    },
    retry(state) {
      state.answers = [];
    },
  },
});

const answerReducer = answerSlice.reducer;

export const { saveAnswer, retry } = answerSlice.actions;

export default answerReducer;
