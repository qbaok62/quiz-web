import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { RedirectRoute, AdminRoute, UserRoute } from "./pages/route-guard";
import { useDispatch, useSelector } from "react-redux";
import { refresh } from "./redux/auth/auth.action";
import { useEffect } from "react";
import { getQuestion } from "./redux/question/question.action";
import Navigation from "./pages/navigation";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import ResultPage from "./pages/result-page";
import QuizPage from "./pages/quiz-page";
import {
  selectAccessToken,
  selectRefreshToken,
  selectRole,
} from "./redux/auth/auth.selector";
import tokenExpried from "./api/tokenExpired";
import AdminPage from "./pages/admin-page";
import UserList from "./components/admin-user/user-list";
import QuestionList from "./components/admin-question/question-list";

function App() {
  const accessToken = useSelector(selectAccessToken);
  const refreshToken = useSelector(selectRefreshToken);
  const role = useSelector(selectRole);
  const dispatch = useDispatch();

  useEffect(() => {
    if (accessToken && refreshToken) {
      tokenExpried(accessToken, () => {
        dispatch(refresh(refreshToken));
      });
    }
  }, [accessToken, refreshToken]);

  useEffect(() => {
    console.log("something");
    if (accessToken && role === "user") {
      dispatch(getQuestion(accessToken));
    }
  }, [accessToken]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route
            element={<RedirectRoute accessToken={accessToken} role={role} />}
          >
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route element={<UserRoute role={role} accessToken={accessToken} />}>
            <Route path="quiz" element={<QuizPage />} />
            <Route path="result" element={<ResultPage />} />
          </Route>
          <Route element={<AdminRoute role={role} accessToken={accessToken} />}>
            <Route path="admin" element={<AdminPage />}>
              <Route path="user" element={<UserList />} />
              <Route path="question" element={<QuestionList />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
