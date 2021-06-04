import React from "react";
import AutoLink from "../AutoLink/AutoLink";
import WidgetContainer from "./WidgetContainer";
import WidgetTitle from "./WidgetTitle";
import { getCategoryPath } from "../../utils/helpers";
import config from "../../../data/SiteConfig";

const WidgetCategory = ({ categoryList }) => (
  <WidgetContainer extraClass="categories-container">
    <WidgetTitle title={config.categoryWidgetTitle} />
    <div>
      {categoryList.map((category) => (
        <AutoLink
          key={category}
          to={getCategoryPath(category)}
          className="block border-bottom border-color-light-grey padding-top-half padding-bottom-half"
        >
          <span>{category}</span>
        </AutoLink>
      ))}
    </div>
  </WidgetContainer>
);

export default WidgetCategory;
