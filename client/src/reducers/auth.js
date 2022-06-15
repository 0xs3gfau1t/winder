import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_SUCCESS,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isLoading: true,
  user: null,
  flag: false,
  id: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        flag: true,
      };
    case REGISTER_FAILED:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case LOGIN_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        isAuthenticated: true,
        flag: true,
        user: action.payload.id,
      };
    default:
      return state;
  }
}
