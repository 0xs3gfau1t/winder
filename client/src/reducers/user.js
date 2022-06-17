import { LOAD_USER } from "../actions/types";

const initialState = {
  cookie: document.cookie.slice(0, 11) == "accessToken", // ? true : false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
