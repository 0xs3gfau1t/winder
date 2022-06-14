import {DISPLAY_ALERT, CLEAR_ALERT } from '../actions/types';

const initialState = {
    showAlert:false,
    alertMsg : '',
    alertType:'',
    isLoading: false,
    flag:''
}

export default function (state = initialState, action) {
    switch (action.type) {
        case DISPLAY_ALERT:
            return {
                ...state,
                ...action.payload,
                showAlert:true,
            }
        case CLEAR_ALERT:
            return {
                ...state,
                showAlert:false,
                alertMsg:''
                }
        default:
            return state
    }
}
