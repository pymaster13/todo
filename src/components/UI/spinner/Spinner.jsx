import React from "react";

export const Spinner = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Загрузка...</span>
      </div>
    </div>
  );
};
