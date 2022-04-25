import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";

import { handleErrors } from "../../services";
import { Input } from "../UI/input/Input";
import { Button } from "../UI/button/Button";
import { clearSuccessErrors, loginUser } from "../../store/actions/auth";

import cls from "../../styles/AuthForm.module.css";

export const LoginForm = () => {
  const [user, setUser] = useState({ username: "", password: "" });

  const userState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    clearSuccessErrors(dispatch);
  }, []);

  if (localStorage.getItem("token")) {
    return <Navigate to="/todos" />;
  }

  return (
    <div>
      <h1 className={cls.title}>Авторизация</h1>

      <form
        className={cls.form}
        onSubmit={(e) => {
          e.preventDefault();
          loginUser(user, dispatch, setUser);
        }}
      >
        <Input
          name="username"
          className={cls.input}
          type="text"
          placeholder="Логин"
          label="Логин"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <Input
          name="password"
          className={cls.input}
          type="password"
          placeholder="Пароль"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        {userState.errors ? (
          <div className="alert alert-danger" role="alert">
            {handleErrors(userState.errors)}
          </div>
        ) : (
          <div></div>
        )}
        <div className={cls.btn}>
          <Button
            style={{ marginTop: "10px" }}
            className="btn btn-primary"
            type="submit"
            label="submit"
          >
            Войти
          </Button>
        </div>
      </form>
    </div>
  );
};
