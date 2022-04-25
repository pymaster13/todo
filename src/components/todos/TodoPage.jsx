import React from "react";

import cls from "../../styles/Todo.module.css";

export const TodoPage = (todo) => {
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
          <div></div>
        </div>
      </div>
    </div>
  );
};
