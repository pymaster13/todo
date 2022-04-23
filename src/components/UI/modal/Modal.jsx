import React from "react";
import { useDispatch } from "react-redux";
import classes from "./Modal.module.css";
import { clearErrorModalAction } from "../../../store/actions/todo";

const Modal = ({ children, visible, setVisible }) => {
  const rootClasses = [classes.myModal];

  if (visible) {
    rootClasses.push(classes.active);
  }

  const dispatch = useDispatch();

  const closeModal = () => {
    setVisible(false);
    clearErrorModalAction(dispatch);
  };

  return (
    <div className={rootClasses.join(" ")} onClick={closeModal}>
      <div
        className={classes.myModalContent}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
