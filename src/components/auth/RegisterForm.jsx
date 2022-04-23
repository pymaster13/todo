import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import cls from "../../styles/AuthForm.module.css";
import { registerUser } from "../../store/actions/auth";
import { handleErrors } from "../../services";
import { Input } from "../UI/input/Input";
import { Button } from "../UI/button/Button";

export const RegisterForm = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const userState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (localStorage.getItem("token")) {
    return <Navigate to="/todos" />;
  }

  return (
    <div>
      <h1 className={cls.title}>Регистрация</h1>

      <form
        className={cls.form}
        onSubmit={(e) => {
          e.preventDefault();
          registerUser(user, dispatch, setUser);
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
          name="email"
          className={cls.input}
          type="text"
          placeholder="Электронная почта"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <Input
          name="password"
          className={cls.input}
          type="password"
          placeholder="Пароль"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <Input
          name="password2"
          className={cls.input}
          type="password"
          placeholder="Подтвердите пароль"
          value={user.password2}
          onChange={(e) => setUser({ ...user, password2: e.target.value })}
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
            Зарегистрироваться
          </Button>
        </div>
      </form>
    </div>
  );
};
