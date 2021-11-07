import React from "react";

function MainContainerWrapper({ children, className = "", ...props }) {
  return (
    <main
      className={`main-container-wrapper container-below-header ${className}`}
      {...props}
    >
      {children}
    </main>
  );
}

export default MainContainerWrapper;
