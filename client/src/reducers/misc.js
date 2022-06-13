import {DISPLAY_ALERT, CLEAR_ALERT } from '../actions/types';

const initialState = {
    showAlert:false,
    alertMsg : '',
    isLoading: false,
    flag:''
}

export default function (state = initialState, action) {
    switch (action.type) {
        case DISPLAY_ALERT:
            return {
                ...state,
                showAlert:true,
                alertMsg:action.payload
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
