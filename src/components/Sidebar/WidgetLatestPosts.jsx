import React from "react";
import AutoLink from "../AutoLink/AutoLink";
import WidgetContainer from "./WidgetContainer";
import WidgetTitle from "./WidgetTitle";
import { getPostList } from "../../utils/helpers";

const WidgetLatesPosts = ({ postSlug, postEdges, title }) => {
  const postList = getPostList(postEdges);

  return (
    <WidgetContainer extraClass="latest-posts-container">
      <WidgetTitle title={title} />
      <div>
        {postList.map((post) => (
          <React.Fragment key={post.title}>
            {postSlug !== post.slug ? (
              <AutoLink
                to={post.slug}
                className="block border-bottom border-color-light-grey padding-top-half padding-bottom-half"
              >
                <span>{post.title}</span>
              </AutoLink>
            ) : null}
          </React.Fragment>
        ))}
      </div>
    </WidgetContainer>
  );
};

export default WidgetLatesPosts;
