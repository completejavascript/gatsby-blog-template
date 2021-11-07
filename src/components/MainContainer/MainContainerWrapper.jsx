import React from "react";
import "./MainContainerWrapper.scss";

function MainContainerWrapper({ children, className = "", ...props }) {
  return (
    <main className={`main-container-wrapper ${className}`} {...props}>
      {children}
    </main>
  );
}

export default MainContainerWrapper;
