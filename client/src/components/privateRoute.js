import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { displayAlert } from "../actions/misc";
import { loadUser } from "../actions/user";

const PrivateRoute = ({ children }) => {
  const [cookies, setCookie] = useCookies(["accessToken"]);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    // console.log(cookies);
    if (cookies) dispatch(loadUser());
  }, [auth.isAuthenticated]);

  if (!cookies) {
    dispatch(displayAlert("Login Required!", "danger"));
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;
