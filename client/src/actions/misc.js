import { DISPLAY_ALERT, CLEAR_ALERT } from "./types";

export const displayAlert = (message ) => (dispatch) => {
    console.log('called')
    console.log(message)
    dispatch({
        type: DISPLAY_ALERT,
        payload: message,
    });
    setTimeout(() => {
        console.log('Cleared')
        dispatch({
          type: CLEAR_ALERT,
        })
      }, 3000)    
}
