import { createSelector } from "reselect";

export const selectAnswers = (state) => state.answers;

export const selectCurrentAnswer = createSelector(
  [selectAnswers],
  (answers) => answers && answers.answers
);
