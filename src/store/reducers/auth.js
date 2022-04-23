import {
  USER_LOADING,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  USER_LOADING_FAIL,
} from "../actions/types";

const initialState = {
  isLoading: false,
  user: null,
  errors: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isLoading: false,
        user: {
          id: action.payload.id,
          username: action.payload.username,
          email: action.payload.email,
        },
        errors: null,
      };

    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        isLoading: false,
        user: null,
        errors: action.payload,
      };

    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isLoading: false,
        user: {
          id: action.payload.id,
          username: action.payload.username,
          email: action.payload.email,
        },
        errors: null,
      };

    case LOGIN_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        isLoading: false,
        user: null,
        errors: action.payload,
      };

    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        isLoading: false,
        user: null,
        errors: null,
      };

    case LOGOUT_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        isLoading: false,
        user: null,
        errors: action.payload,
      };

    case USER_LOADING:
      return { ...state, isLoading: true };

    case USER_LOADING_FAIL:
      return {
        ...state,
        isLoading: false,
        user: null,
        errors: action.payload,
      };

    case USER_LOADED:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        errors: null,
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: {
          id: action.payload.id,
          username: action.payload.username,
          email: action.payload.email,
        },
        errors: null,
      };

    case UPDATE_USER_FAIL:
      return {
        ...state,
        errors: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
