import axios from "axios";
import { LOAD_USER } from "./types";
import { displayAlert } from "./misc";
const url = process.env.URL;

export const user = () => (dispatch) => {
  axios
    .get(url + "/user", user_data)
    .then((res) => {
      dispatch(displayAlert("Account created.", "success"));
      setTimeout(
        () =>
          dispatch({
            type: REGISTER_SUCCESS,
            payload: res,
          }),
        5000
      );
    })
    .catch((err) => {
      dispatch(displayAlert(err.response.data.error, "danger"));
      dispatch({
        type: REGISTER_FAILED,
      });
    });
};

export const login =
  ({ email, password }) =>
  (dispatch) => {
    const user_data = { email: email, password: password };
    // console.log(user_data);
    axios
      .post(url + "/auth/login", user_data)
      .then((res) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch(displayAlert(err.response.data.error, "danger"));
        dispatch({
          type: LOGIN_FAILED,
        });
      });
  };
