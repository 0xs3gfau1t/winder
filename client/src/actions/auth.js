import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAILED } from "./types";

export const register = ({ username, first_name, last_name, email, password1, file }) => (dispatch) => {
    //console.log('called')
    // console.log(state)
    // Headers
    let formdata = new FormData()
    formdata.append('username', username)
    formdata.append('first_name', first_name)
    formdata.append('last_name', last_name)
    formdata.append('email', email)
    formdata.append('password', password1)
    formdata.append('file', file)

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };

    axios
        .post('/user', formdata, config)
        .then((res) => {
            window.alert('Account Created.')
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            window.alert(err.response.data)
            dispatch({
                type: REGISTER_FAILED
            });
        });
    //console.log('Done')
}