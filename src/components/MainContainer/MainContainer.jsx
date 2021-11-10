import React from "react";
import MainContainerWrapper from "./MainContainerWrapper";
import "./MainContainer.scss";

const MainContainer = ({
  content,
  sidebarLeft,
  sidebarRight,
  className = "",
}) => (
  <MainContainerWrapper className={`main-container container ${className}`}>
    {sidebarLeft && (
      <div className="sidebar-wrapper left padding-top-half padding-bottom-2">
        {sidebarLeft}
      </div>
    )}
    {content && (
      <div
        className={`content-wrapper padding-top-half padding-bottom-2 ${
          sidebarLeft ? "hasLeft" : ""
        } ${sidebarRight ? "hasRight" : ""}`}
      >
        {content}
      </div>
    )}
    {sidebarRight && (
      <div className="sidebar-wrapper right padding-top-half padding-bottom-2">
        {sidebarRight}
      </div>
    )}
  </MainContainerWrapper>
);

export default MainContainer;
