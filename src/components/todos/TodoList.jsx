import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router";

import { getTodos } from "../../store/actions/todo";
import { Todo } from "./Todo";
import { Button } from "../UI/button/Button";
import { Modal } from "../UI/modal/Modal";
import { TodoForm } from "./TodoForm";
import { Spinner } from "../UI/spinner/Spinner";

export const TodoList = () => {
  const dispatch = useDispatch();
  const todosState = useSelector((state) => state.todo);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    getTodos(dispatch);
  }, []);

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

        {todosState.isLoading ? <Spinner /> : <div></div>}

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
