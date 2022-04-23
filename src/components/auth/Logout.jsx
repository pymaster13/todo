import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../store/actions/auth";

export const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.auth);

  useEffect(() => {
    logoutUser(dispatch);
    navigate("/");
  }, [state]);

  return <div></div>;
};
