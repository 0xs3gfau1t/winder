import { DISPLAY_ALERT, CLEAR_ALERT } from "./types";

export const displayAlert =
  (message, alertType, persist = false) =>
  (dispatch) => {
    // console.log("called displayAlert");
    const data = {
      alertMsg: message,
      alertType: alertType,
    };
    dispatch({
      type: DISPLAY_ALERT,
      payload: data,
    });
    if (!persist) {
      setTimeout(() => {
        // console.log("Cleared");
        dispatch({
          type: CLEAR_ALERT,
        });
      }, 3000);
    }
  };
