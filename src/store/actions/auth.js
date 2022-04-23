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
  try {
    const response = await UserService.login(user.username, user.password);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({ type: LOGIN_FAIL, payload: err.response.data });
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

export const registerUser = async (user, dispatch, setUser) => {
  try {
    if (!user.username || !user.email || !user.password || !user.password2) {
      dispatch({
        type: REGISTER_FAIL,
        payload: "Все поля должны быть заполнены.",
      });
      return;
    }
    if (user.password !== user.password2) {
      dispatch({ type: REGISTER_FAIL, payload: "Пароли не совпадают." });
      return;
    }

    if (!user.email.includes('@')) {
      dispatch({ type: REGISTER_FAIL, payload: "Введите корректную электронную почту." });
      return;
    }

    const response = await UserService.register(
      user.username,
      user.email,
      user.password
    );

    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data,
    });
    setUser({ username: "", email: "", password: "", password2: "" });
  } catch (err) {
    dispatch({ type: REGISTER_FAIL, payload: err.response.data });
  }
};

export const updateUser = async (dispatch, user, navigate) => {
  try {
    if (!user.username) {
      dispatch({
        type: UPDATE_USER_FAIL,
        payload: "Имя пользователя не может быть пустым.",
      });
      return;
    }
    if (!user.email) {
      dispatch({
        type: UPDATE_USER_FAIL,
        payload: "Электронная почта пользователя не может быть пустой.",
      });
      return;
    }

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
    navigate("/todos");
  } catch (err) {
    dispatch({ type: UPDATE_USER_FAIL, payload: err.response.data });
  }
};
