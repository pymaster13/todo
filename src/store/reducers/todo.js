import {
  TODOS_LOADED,
  TODOS_LOADING,
  TODOS_LOADING_FAIL,
  TODO_CREATE_FAIL,
  TODO_CREATED,
  TODO_CLOSE_MODAL,
  TODO_LOADING,
  TODO_LOADED,
  TODO_LOADING_FAIL,
  TODO_DELETED,
} from "../actions/types";

const initialState = {
  isLoading: false,
  todos: null,
  todo: null,
  errors: null,
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case TODOS_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case TODOS_LOADED:
      console.log(action.payload);
      return {
        ...state,
        isLoading: false,
        todos: action.payload,
      };

    case TODOS_LOADING_FAIL:
      return {
        ...state,
        isLoading: false,
        errors: action.payload,
      };

    case TODO_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case TODO_LOADED:
      return {
        ...state,
        isLoading: false,
        todo: action.payload,
      };

    case TODO_LOADING_FAIL:
      return {
        ...state,
        isLoading: false,
        todo: null,
        errors: action.payload,
      };

    case TODO_CREATED:
      return {
        ...state,
        isLoading: false,
      };

    case TODO_CREATE_FAIL:
      return {
        ...state,
        isLoading: false,
        errors: action.payload,
      };

    case TODO_DELETED:
      return {
        ...state,
        isLoading: false,
      };

    case TODO_CREATE_FAIL:
      return {
        ...state,
        isLoading: false,
        errors: action.payload,
      };

    case TODO_CLOSE_MODAL:
      return {
        ...state,
        isLoading: false,
        errors: null,
      };

    default:
      return state;
  }
};

export default todoReducer;
