import React from "react";

export const Button = ({ children, ...props }) => {
  return (
    <div>
      <button {...props}>
        {children}
      </button>
    </div>
  );
};
