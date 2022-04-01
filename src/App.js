import "./App.css";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { refresh } from "./redux/auth/auth.middleware";
import LayoutPage from "./pages/LayoutPage";
import QuizPage from "./pages/QuizPage";
import AuthPage from "./pages/AuthPage";
import UserPage from "./pages/UserPage";
import ResultPage from "./pages/ResultPage";
import RequireAuth from "./pages/RequireAuth";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const accessToken = useSelector((state) => state.auth.accessToken);
  const refreshToken = useSelector((state) => state.auth.refreshToken);

  useEffect(() => {
    if (accessToken) {
      navigate("/quiz", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      const { exp } = jwt_decode(accessToken);
      const handleTokenExpired = (exp) => {
        let expiredTimer;

        window.clearTimeout(expiredTimer);
        const currentTime = Date.now();
        const timeLeft = exp * 1000 - currentTime;
        expiredTimer = window.setTimeout(() => {
          dispatch(refresh(refreshToken));
        }, timeLeft);
      };
      handleTokenExpired(exp);
    }
  }, [dispatch]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LayoutPage />}>
          <Route index element={<AuthPage />} />
          <Route element={<RequireAuth />}>
            <Route path="quiz" element={<QuizPage />} />
            <Route path="user" element={<UserPage />} />
            <Route path="result" element={<ResultPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
