import axios from "../../api/axios";
import { getQuestionSuccess, loading, loadingDone } from "./question.reducer";
import { Modal } from "antd";

export const getQuestion = (accessToken) => async (dispatch) => {
  try {
    dispatch(loading());
    const { data } = await axios.get("/v1/questions", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(getQuestionSuccess(data.results));
  } catch (error) {
    Modal.error({
      title: "Get questions failed",
      content: error.response.data.message,
    });
  } finally {
    dispatch(loadingDone());
  }
};
