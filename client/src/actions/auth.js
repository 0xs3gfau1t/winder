import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAILED } from './types';
// import dotenv from 'dotenv'
// dotenv.config()
//  const url = process.env.URL
export const register = (user_data) => (dispatch) => {
  console.log('called')
  console.log(state)
  return 
  delete user_data['password2']
  delete user_data['isMember']

  axios
    .post(url+'/auth/register', user_data, config)
    .then((res) => {
      window.alert('Account Created.');
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      window.alert(err.response.data);
      dispatch({
        type: REGISTER_FAILED,
      });
    });
  // console.log('Done')
};
