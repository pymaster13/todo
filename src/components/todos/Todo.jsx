import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button } from "../UI/button/Button";
import { deleteTodoAction } from "../../store/actions/todo";
import { getTodos } from "../../store/actions/todo";

import cls from "../../styles/Todo.module.css";

export const Todo = (todo) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deleteTodoAndRefreshTodos = () => {
    deleteTodoAction(dispatch, todo.id);
    setTimeout(() => {
      getTodos(dispatch);
    }, 100);
  };

  return (
    <div className={cls.todo}>
      <div className="card">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          className="card-body"
        >
          <div>
            <p>Содержание: {todo.contents}</p>
            <p>Автор: {todo.owner}</p>
            <p>Создана: {todo.date_on}</p>
          </div>
          <div>
            <Button
              className="btn btn-secondary"
              onClick={() => navigate(`/todos/${todo.id}`)}
            >
              Открыть
            </Button>
            {todo.edit ? (
              <Button
                style={{ margin: "10px 0 10px 0" }}
                className="btn btn-danger"
                onClick={deleteTodoAndRefreshTodos}
              >
                Удалить
              </Button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
