import React from "react";
import Thumbnail from "./Thumbnail";
import PostInfo from "./PostInfo";

const Article = ({ post, hasThumbnail }) => (
  <article 
    key={post.title} 
    className="flex padding-bottom-2 padding-top-2 border-bottom border-color-light-grey"
  >
    {hasThumbnail && <Thumbnail post={post} extraClass="flex-static" />}
    <PostInfo post={post} extraClass="flex-spread" />
  </article>
)

export default Article;