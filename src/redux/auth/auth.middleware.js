import axios from "../../api/axios";
import { loginSuccess, logoutSuccess, refreshSuccess } from "./auth.reducer";

const login =
  ({ name, password }) =>
  async (dispatch) => {
    const response = await axios.post("/v1/auth/login", {
      username: name,
      password,
    });
    // .then((response) => {
    //   dispatch(loginSuccess({ tokens, user }));
    // })
    // .catch((err) => {
    //   let errorMessage = "Authentication failed";
    //   alert(errorMessage);
    // });
    const { tokens, user } = response.data;
    dispatch(loginSuccess({ tokens, user }));
    // console.log(response);
  };

const register =
  ({ name, password, email }) =>
  async (dispatch) => {
    axios
      .post("/v1/auth/register", {
        username: name,
        password,
        email,
      })
      .then(() => {
        let successMessage = "Signup succeed";
        alert(successMessage);
      })
      .catch((err) => {
        if (err.response) {
          console.log("data: ", err.response.data);
          console.log("status: ", err.response.status);
          console.log("headers: ", err.response.headers);
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log("ERROR: ", err.message);
        }
        console.log("config: ", err.config);
      });
  };

const refresh = (refreshToken) => async (dispatch) => {
  const response = await axios.post("/v1/auth/refresh-tokens", {
    refreshToken,
  });
  dispatch(refreshSuccess(response.data));
  console.log("response:", response);
};

const logout = (refreshToken) => async (dispatch) => {
  await axios.post("/v1/auth/logout", {
    refreshToken,
  });
  dispatch(logoutSuccess());
};

export { login, logout, register, refresh };
