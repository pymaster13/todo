import React from "react";
import cls from "../../styles/Todo.module.css";
import { Button } from "../UI/button/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteTodoAction } from "../../store/actions/todo";

export const TodoPage = (todo) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
            {todo.edit ? (
              <Button
                style={{ margin: "10px 0 10px 0" }}
                className="btn btn-danger"
                onClick={() => deleteTodoAction(dispatch, todo.id, navigate)}
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
