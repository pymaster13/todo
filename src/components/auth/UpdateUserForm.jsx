import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { clearSuccessErrors } from "../../store/actions/auth";
import { updateUser } from "../../store/actions/auth";
import { handleErrors } from "../../services";
import { Input } from "../UI/input/Input";
import { Button } from "../UI/button/Button";
import { Spinner } from "../UI/spinner/Spinner";

import cls from "../../styles/AuthForm.module.css";

export const UpdateUserForm = () => {
  const [initialUser, setInitialUser] = useState({
    username: "",
    email: "",
    password: "",
    id: "",
  });

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    id: "",
  });

  const userState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userState.user) {
      if (user.password) {
        setUser({
          ...user,
          password: "",
        });
      } else {
        setUser({
          ...user,
          id: userState.user.id,
          username: userState.user.username,
          email: userState.user.email,
        });

        setInitialUser({
          ...initialUser,
          id: userState.user.id,
          username: userState.user.username,
          email: userState.user.email,
        });
      }
    }
  }, [userState]);

  useEffect(() => {
    clearSuccessErrors(dispatch);
  }, []);

  return (
    <div>
      <h1 className={cls.title}>Данные пользователя</h1>

      {userState.isLoading ? (
        <Spinner />
      ) : (
        <form
          className={cls.form}
          onSubmit={(e) => {
            e.preventDefault();
            updateUser(dispatch, user, initialUser, setUser);
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
          {userState.success ? (
            <div className="alert alert-success" role="alert">
              {userState.success}
            </div>
          ) : (
            <div></div>
          )}

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
              Изменить
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
