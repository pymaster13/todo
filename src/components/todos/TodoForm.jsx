import React from "react";
import { useState } from "react";
import { Button } from "../UI/button/Button";
import { Input } from "../UI/input/Input";
import { useDispatch, useSelector } from "react-redux";
import { createTodoAction } from "../../store/actions/todo";
import cls from "../../styles/AuthForm.module.css";

export const TodoForm = ({ setVisible }) => {
  const [todoContent, setTodoContent] = useState("");
  const todoState = useSelector((state) => state.todo);

  const dispatch = useDispatch();

  const createTodo = (e) => {
    e.preventDefault();
    createTodoAction(dispatch, todoContent, setVisible);
    setTodoContent("");
  };

  return (
    <form onSubmit={createTodo}>
      <div>
        <Input
          value={todoContent}
          onChange={(e) => setTodoContent(e.target.value)}
          placeholder="Содержание заметки"
        />
        <span className={cls.span__error}>
          {todoState.errors && todoState.errors != null ? todoState.errors : ""}
        </span>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button style={{ marginTop: "10px" }} className="btn btn-primary">
            Создать
          </Button>
        </div>
      </div>
    </form>
  );
};
