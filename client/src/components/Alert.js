import React from "react";
import { useSelector } from "react-redux";

const Alert = () => {
  const { alertMsg, alertType } = useSelector((state) => state.misc);
  // console.log(alertMsg)
  return <div className={`alert alert-${alertType}`}>{alertMsg}</div>;
};

export default Alert;
