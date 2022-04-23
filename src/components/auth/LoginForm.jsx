import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import cls from "../../styles/AuthForm.module.css";
import { handleErrors } from "../../services";
import { Input } from "../UI/input/Input";
import { Button } from "../UI/button/Button";
import { loginUser } from "../../store/actions/auth";
import { Navigate } from "react-router";

export const LoginForm = () => {
  const [user, setUser] = useState({ username: "", password: "" });

  const userState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

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
        <span className={cls.span__error}>
          {userState.errors && userState.errors != null
            ? handleErrors(userState.errors)
            : ""}
        </span>
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
