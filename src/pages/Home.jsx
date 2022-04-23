import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";

const Home = () => {
  if (localStorage.getItem("token")) {
    return <Navigate to="/todos" />;
  }

  return <div>
    <h1 style={{textAlign: 'center'}}>Домашняя страница</h1>
  </div>;
};

export default Home;
