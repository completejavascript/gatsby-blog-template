import React from "react";
import "./MacWindow.scss";

function MacWindow({ children, dark }) {
  return (
    <div className={`mac-window ${dark ? "dark" : ""}`}>
      <div className="menubar">
        <div className="mac-btn one"></div>
        <div className="mac-btn two"></div>
        <div className="mac-btn three"></div>
      </div>
      <div className="content padding-2">{children}</div>
    </div>
  );
}

export default MacWindow;
