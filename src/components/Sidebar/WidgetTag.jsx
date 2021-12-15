import React from "react";
import Tag from "../Tag/Tag";
import WidgetContainer from "./WidgetContainer";
import WidgetTitle from "./WidgetTitle";
import { sidebarConfig } from "../../../data/config";

const WidgetTag = ({ tagList }) => (
  <WidgetContainer extraClass="categories-container sidebar-widget">
    <WidgetTitle title={sidebarConfig.tagTitle} />
    <div>
      {tagList.map((tag) => (
        <Tag key={tag} content={tag} />
      ))}
    </div>
  </WidgetContainer>
);

export default WidgetTag;
