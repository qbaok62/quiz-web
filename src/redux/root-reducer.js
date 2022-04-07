import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./auth/auth.reducer.js";
import answerReducer from "./answer/answer.reducer.js";
import questionReducer from "./question/question.reducer.js";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  authentication: authReducer,
  answers: answerReducer,
  questions: questionReducer,
});

export default persistReducer(persistConfig, rootReducer);
