import React from "react";

import cls from "../styles/AuthForm.module.css";

export const NoMatch = () => {
  return (
    <div>
      <h1 className={cls.title}>Такой страницы не существует</h1>
    </div>
  );
};
