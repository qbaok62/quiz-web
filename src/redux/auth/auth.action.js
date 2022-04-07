import axios from "../../api/axios";
import {
  loading,
  loadingDone,
  loginSuccess,
  logoutSuccess,
  refreshSuccess,
  scoreCalculate,
  submitLoading,
} from "./auth.reducer";
import { Modal } from "antd";

export const login = (event) => async (dispatch) => {
  dispatch(loading());
  try {
    const { data } = await axios.post("/v1/auth/login", event);
    dispatch(loginSuccess(data));
  } catch (error) {
    Modal.error({
      title: "Login failed",
      content: error.response.data.message,
    });
  } finally {
    dispatch(loadingDone());
  }
};

export const register = (event, form) => async (dispatch) => {
  dispatch(loading());
  try {
    await axios.post("/v1/auth/register", event);
    Modal.success({
      title: "Register successed",
    });
    form.resetFields();
  } catch (error) {
    Modal.error({
      title: "Register failed",
      content: error.response.data.message,
    });
  } finally {
    dispatch(loadingDone());
  }
};

export const logout = (refreshToken) => async (dispatch) => {
  dispatch(loading());
  try {
    await axios.post("/v1/auth/logout", {
      refreshToken,
    });
    dispatch(logoutSuccess());
  } catch (error) {
    Modal.error({
      title: "Logout failed",
      content: error.response.data.message,
    });
  } finally {
    dispatch(loadingDone());
  }
};

export const refresh = (refreshToken) => async (dispatch) => {
  const { data } = await axios.post("/v1/auth/refresh-tokens", {
    refreshToken,
  });
  dispatch(refreshSuccess(data));
};

export const submitAnswer =
  (answers, accessToken, navigate) => async (dispatch) => {
    dispatch(submitLoading());
    try {
      const { data } = await axios.post("/v1/questions/submit", [...answers], {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      dispatch(scoreCalculate(data));
      navigate("/result");
    } catch (error) {
      Modal.error({
        title: "Submit failed",
        content: "You have to answer all questions",
      });
    } finally {
      dispatch(loadingDone());
    }
  };
