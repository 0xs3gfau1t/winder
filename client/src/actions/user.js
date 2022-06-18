import axios from "axios";
import { LOAD_USER, REGISTER_FAILED } from "./types";
import { displayAlert } from "./misc";
const url = process.env.URL;

export const loadUser = () => (dispatch) => {
  axios
    .get(url + "/user", { withCredentials: true })
    .then((res) => {
      dispatch({
        type: LOAD_USER,
        payload: res.data.result,
      });
    })
    .catch((err) => {
      dispatch(displayAlert(err.response.data.error, "danger"));
      dispatch({
        type: REGISTER_FAILED,
      });
    });
};
