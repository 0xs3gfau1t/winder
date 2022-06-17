import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { displayAlert } from "../actions/misc";

const PrivateRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // if (auth.isAuthenticated) {
  return children;
  // }
  dispatch(displayAlert("Login Required!", "danger"));
  return <Navigate to="/login" />;
};

export default PrivateRoute;
