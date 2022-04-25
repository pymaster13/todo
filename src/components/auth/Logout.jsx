import { React, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logoutUser } from "../../store/actions/auth";

export const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    logoutUser(dispatch);
    setTimeout(() => {
      navigate("/login");
    }, 100);
  }, []);

  return <div></div>;
};
