import React from "react";
import MainContainerWrapper from "./MainContainerWrapper";
import "./MainContainer.scss";

const MainContainer = ({ content, sidebar }) => (
  <MainContainerWrapper className="main-container container">
    <div className="content-wrapper padding-top-half padding-bottom-2">
      {content}
    </div>
    <div className="sidebar-wrapper padding-top-half padding-bottom-2">
      {sidebar}
    </div>
  </MainContainerWrapper>
);

export default MainContainer;
