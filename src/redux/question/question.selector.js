import { createSelector } from "reselect";

const selectQuestions = (state) => state.questions;

export const selectCurrentQuestion = createSelector(
  [selectQuestions],
  (questions) => questions && questions.questions
);

export const selectLoading = createSelector(
  [selectQuestions],
  (questions) => questions && questions.loading
);
