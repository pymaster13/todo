import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getTodos } from "../../store/actions/todo";
import { Button } from "../UI/button/Button";
import { Input } from "../UI/input/Input";
import { createTodoAction } from "../../store/actions/todo";

export const TodoForm = ({ setVisible }) => {
  const [todoContent, setTodoContent] = useState("");
  const todoState = useSelector((state) => state.todo);

  const dispatch = useDispatch();

  const createTodo = (e) => {
    e.preventDefault();
    createTodoAction(dispatch, todoContent, setVisible);
    if (todoContent) {
      setTimeout(() => getTodos(dispatch), 100);
      setTodoContent("");
    }
  };

  return (
    <form onSubmit={createTodo}>
      <div>
        <Input
          value={todoContent}
          onChange={(e) => setTodoContent(e.target.value)}
          placeholder="Содержание заметки"
        />
        {todoState.errors ? (
          <div className="alert alert-danger" role="alert">
            {todoState.errors}
          </div>
        ) : (
          <div></div>
        )}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button style={{ marginTop: "10px" }} className="btn btn-primary">
            Создать
          </Button>
        </div>
      </div>
    </form>
  );
};
