import axios from "axios";

export default axios.create({
  baseURL: "https://fwa-ec-quiz.herokuapp.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export const instance = axios.create({
  baseURL: "https://fwa-ec-quiz.herokuapp.com",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.response.use(
  (res) => {
    return res.data.access;
  },
  async (err) => {
    return Promise.reject(err);
  }
);
