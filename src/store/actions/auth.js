import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  USER_LOADING,
  USER_LOADING_FAIL,
  REGISTER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_SUCCESS,
  CLEAR_SUCCESS_ERRORS,
} from "./types";
import UserService from "../../API/UserService";

export const getUserInfo = async (dispatch) => {
  dispatch({ type: USER_LOADING });

  try {
    const response = await UserService.info(localStorage.getItem("token"));

    dispatch({
      type: USER_LOADED,
      payload: response.data,
    });
  } catch (err) {
    dispatch({ type: USER_LOADING_FAIL });
  }
};

export const loginUser = async (user, dispatch, setUser) => {
  if (!user.username && !user.password) {
    dispatch({ type: LOGIN_FAIL, payload: "Введите логин и пароль." });
  } else if (!user.username) {
    dispatch({ type: LOGIN_FAIL, payload: "Введите логин." });
  } else if (!user.password) {
    dispatch({ type: LOGIN_FAIL, payload: "Введите пароль." });
  } else {
    try {
      const response = await UserService.login(user.username, user.password);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({ type: LOGIN_FAIL, payload: err.response.data });
    }
  }
};

export const logoutUser = async (dispatch) => {
  try {
    await UserService.logout(dispatch);
    dispatch({
      type: LOGOUT_SUCCESS,
    });
  } catch (err) {
    dispatch({ type: LOGOUT_FAIL, payload: err.response.data });
  }
};

export const registerUser = async (user, dispatch) => {
  if (!user.username || !user.email || !user.password || !user.password2) {
    dispatch({
      type: REGISTER_FAIL,
      payload: "Все поля должны быть заполнены.",
    });
  } else if (user.password !== user.password2) {
    dispatch({ type: REGISTER_FAIL, payload: "Пароли не совпадают." });
  } else if (!user.email.includes("@")) {
    dispatch({
      type: REGISTER_FAIL,
      payload: "Введите корректную электронную почту.",
    });
  } else {
    try {
      const response = await UserService.register(
        user.username,
        user.email,
        user.password
      );
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({ type: REGISTER_FAIL, payload: err.response.data });
    }
  }
};

export const clearSuccessErrors = (dispatch) => {
  dispatch({
    type: CLEAR_SUCCESS_ERRORS,
  });
};

export const updateUser = async (dispatch, user, initialUser, setUser) => {
  if (!user.username) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: "Имя пользователя не может быть пустым.",
    });
  } else if (!user.email) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: "Электронная почта пользователя не может быть пустой.",
    });
  } else if (!user.email.includes("@")) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: "Введите корректную электронную почту.",
    });
  } else if (
    user.username === initialUser.username &&
    user.email === initialUser.email &&
    !user.password
  ) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: "",
    });
  } else {
    try {
      const response = await UserService.updateInfo(
        user.id,
        user.username,
        user.email,
        user.password
      );

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({ type: UPDATE_USER_FAIL, payload: err.response.data });
    } finally {
      setUser({ ...user, password: null });
    }
  }
};
