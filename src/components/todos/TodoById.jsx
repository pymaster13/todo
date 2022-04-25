import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

import { getTodoByIdAction } from "../../store/actions/todo";
import { TodoPage } from "./TodoPage";
import { Spinner } from "../UI/spinner/Spinner";
import { Button } from "../UI/button/Button";

import cls from "../../styles/AuthForm.module.css";

export const TodoById = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const todoState = useSelector((state) => state.todo);
  const navigate = useNavigate();

  useEffect(() => {
    getTodoByIdAction(dispatch, param.id);
  }, []);

  return (
    <div>
      <h1 className={cls.title}>Заметка</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          className="btn btn-secondary"
          style={{ marginBottom: "10px" }}
          onClick={() => navigate("/todos")}
        >
          Вернуться к заметкам
        </Button>
      </div>
      <div style={{ width: "550px", marginLeft: "35%" }}>
        {todoState.isLoading ? <Spinner /> : <TodoPage {...todoState.todo} />}
      </div>
    </div>
  );
};
