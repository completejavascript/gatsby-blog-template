import React from "react";
import AutoLink from "../AutoLink/AutoLink";
import WidgetContainer from "./WidgetContainer";
import WidgetTitle from "./WidgetTitle";
import { getTagPath } from "../../utils/helpers";

const WidgetTag = ({ tagList }) => (
  <WidgetContainer extraClass="categories-container">
    <WidgetTitle title="Tags" />
    <div>
      {
        tagList.map(tag => (
          <AutoLink 
            key={tag} 
            to={getTagPath(tag)}
            className="inline-block margin-right-half margin-bottom-half 
              border border-color-light-grey padding-left-half padding-right-half"
          >
            <span>{tag}</span>
          </AutoLink>
        ))
      }
    </div>
  </WidgetContainer>
)

export default WidgetTag;