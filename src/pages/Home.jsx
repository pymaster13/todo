import React from "react";
import { Navigate } from "react-router";

export const Home = () => {
  if (localStorage.getItem("token")) {
    return <Navigate to="/todos" />;
  } else {
    return <Navigate to="/login" />;
  }
};