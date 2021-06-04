import React from "react";
import AutoLink from "../AutoLink/AutoLink";
import WidgetContainer from "./WidgetContainer";
import WidgetTitle from "./WidgetTitle";
import { getPostList } from "../../utils/helpers";
import config from "../../../data/SiteConfig";

const WidgetLatesPosts = ({ latestPostEdges }) => {
  const postList = getPostList(latestPostEdges);

  return (
    <WidgetContainer extraClass="latest-posts-container">
      <WidgetTitle title={config.latestPostsWidgetTitle} />
      <div>
        {postList.map((post) => (
          <AutoLink
            key={post.title}
            to={post.slug}
            className="block border-bottom border-color-light-grey padding-top-half padding-bottom-half"
          >
            <span>{post.title}</span>
          </AutoLink>
        ))}
      </div>
    </WidgetContainer>
  );
};

export default WidgetLatesPosts;
