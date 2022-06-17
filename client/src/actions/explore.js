import axios from "axios";
import { LOAD_EXPLORE } from "./types";
import { displayAlert } from "./misc";
const url = process.env.URL;

export const loadExplore = () => (dispatch) => {
  axios
    .get(url + "/explore", { withCredentials: true })
    .then((res) => {
      dispatch({
        type: LOAD_USER,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(
        displayAlert(
          "Oh dear! You need to verify your mail to find your love..",
          "danger",
          true
        )
      );
    });
};
