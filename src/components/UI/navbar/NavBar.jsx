import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

import { getUserInfo } from "../../../store/actions/auth";

export const NavBar = () => {
  const userState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserInfo(dispatch);
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            ToDo
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul style={{ width: "100%" }} className="navbar-nav">
              {localStorage.getItem("token") &&
              localStorage.getItem("token") != null ? (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <li className="nav-item">
                      <Link className="nav-link" to="/todos">
                        Заметки
                      </Link>
                    </li>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <li className="nav-item">
                      {userState && userState != null && userState.user ? (
                        <Link
                          className="nav-link"
                          style={{ marginRight: "20px" }}
                          to="update/profile"
                        >
                          Пользователь: {userState.user.username}
                        </Link>
                      ) : (
                        <span></span>
                      )}
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/logout">
                        Выход
                      </Link>
                    </li>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Регистрация
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Вход
                    </Link>
                  </li>
                </div>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};
