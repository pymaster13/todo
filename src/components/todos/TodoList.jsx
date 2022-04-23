import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getTodos } from "../../store/actions/todo";
import { Todo } from "./Todo";
import { Button } from "../UI/button/Button";
import Modal from "../UI/modal/Modal";
import { TodoForm } from "./TodoForm";
import { Navigate } from "react-router";

export const TodoList = () => {
  const dispatch = useDispatch();
  const todosState = useSelector((state) => state.todo);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    getTodos(dispatch);
  }, []);

  // AFTER CREATING TODO
  useEffect(() => {
    if (!modal) {
      getTodos(dispatch);
    }
  }, [modal]);

  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "20px 0 20px 0" }}>Заметки</h1>

      <div style={{ width: "550px", marginLeft: "35%" }}>
        <Button
          className="btn btn-primary"
          style={{ marginBottom: "10px" }}
          onClick={() => setModal(true)}
        >
          Создать заметку
        </Button>
        <div style={{ display: "flex", flexDirection: "column-reverse" }}>
          {todosState.todos && todosState.todos != null
            ? todosState.todos.map((item) => <Todo key={item.id} {...item} />)
            : ""}
        </div>

        <Modal visible={modal} setVisible={setModal}>
          <TodoForm setVisible={setModal} />
        </Modal>
      </div>
    </div>
  );
};
