import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import cls from "../../styles/AuthForm.module.css";
import { updateUser } from "../../store/actions/auth";
import { handleErrors } from "../../services";
import { Input } from "../UI/input/Input";
import { Button } from "../UI/button/Button";
import { useNavigate } from "react-router";

export const UpdateUserForm = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    id: "",
  });

  const userState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (userState.user) {
      setUser({
        ...user,
        id: userState.user.id,
        username: userState.user.username,
        email: userState.user.email,
      });
    }
  }, [userState]);

  return (
    <div>
      <h1 className={cls.title}>Данные пользователя</h1>

      <form
        className={cls.form}
        onSubmit={(e) => {
          e.preventDefault();
          updateUser(dispatch, user, navigate);
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
        <span className={cls.span__error}>
          {userState.errors && userState.errors != null
            ? handleErrors(userState.errors)
            : ""}
        </span>
        <div className={cls.btn}>
          <Button className="btn btn-primary" type="submit" label="submit">
            Изменить
          </Button>
        </div>
      </form>
    </div>
  );
};
