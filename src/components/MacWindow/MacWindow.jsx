import React from "react";
import "./MacWindow.scss";

function MacWindow({ children }) {
  return (
    <div className="mac-window">
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
