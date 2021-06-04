import React from "react";
import Tag from "../Tag/Tag";
import WidgetContainer from "./WidgetContainer";
import WidgetTitle from "./WidgetTitle";
import config from "../../../data/SiteConfig";

const WidgetTag = ({ tagList }) => (
  <WidgetContainer extraClass="categories-container">
    <WidgetTitle title={config.tagWidgetTitle} />
    <div>
      {tagList.map((tag) => (
        <Tag key={tag} content={tag} />
      ))}
    </div>
  </WidgetContainer>
);

export default WidgetTag;
