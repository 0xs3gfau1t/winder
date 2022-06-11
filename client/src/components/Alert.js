import React from 'react';
import { useSelector } from "react-redux";

const Alert = () => {
    const {alertMsg} = useSelector(state => state.misc)
    // console.log(alertMsg)
    return <div className={`alert alert-danger`}>{alertMsg}</div>
}

export default Alert;
