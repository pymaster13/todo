import {
  TODOS_LOADED,
  TODOS_LOADING_FAIL,
  TODOS_LOADING,
  TODO_CREATED,
  TODO_CREATE_FAIL,
  TODO_CLOSE_MODAL,
  TODO_LOADING,
  TODO_LOADED,
  TODO_LOADING_FAIL,
  TODO_DELETED,
  TODO_DELETE_FAIL,
} from "./types";

import TodoService from "../../API/TodoService";

export const getTodos = async (dispatch) => {
  dispatch({ type: TODOS_LOADING });

  try {
    const response = await TodoService.getAllTodos();
    dispatch({
      type: TODOS_LOADED,
      payload: response.data,
    });
  } catch (err) {
    dispatch({ type: TODOS_LOADING_FAIL });
  }
};

export const createTodoAction = async (dispatch, content, setVisibleModal) => {
  if (!content) {
    dispatch({
      type: TODO_CREATE_FAIL,
      payload: "Заметка не может быть пустой.",
    });
    return;
  }

  try {
    await TodoService.createTodo(content);

    dispatch({
      type: TODO_CREATED,
    });

    setVisibleModal(false);

    dispatch({
      type: TODO_CLOSE_MODAL,
    });
  } catch (err) {
    dispatch({ type: TODO_CREATE_FAIL, payload: err.response.data });
  }
};

export const deleteTodoAction = async (dispatch, id) => {
  try {
    await TodoService.deleteTodo(id);
    dispatch({
      type: TODO_DELETED,
    });
  } catch (err) {
    dispatch({ type: TODO_DELETE_FAIL, payload: err.response.data });
  }
};

export const clearErrorModalAction = async (dispatch) => {
  dispatch({
    type: TODO_CLOSE_MODAL,
  });
  return;
};

export const getTodoByIdAction = async (dispatch, id) => {
  try {
    dispatch({
      type: TODO_LOADING,
    });

    const response = await TodoService.getTodoById(id);

    dispatch({
      type: TODO_LOADED,
      payload: response.data,
    });
  } catch (err) {
    dispatch({ type: TODO_LOADING_FAIL, payload: err.response.data });
  }
};
