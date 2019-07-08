import React from "react";
import AutoLink from "../AutoLink/AutoLink";
import PostDate from "./PostDate";
import { getCategoryPath } from "../../utils/helpers";

const PostMeta = ({ post, extraClass }) => {
  const categoryLink = (
    <AutoLink className="text-uppercase" to={getCategoryPath(post.category)}>
      <b>{post.category}</b>
    </AutoLink>
  )

  return (
    <div className={extraClass}>
      <PostDate date={post.date} /> 
      <span className="text-description">
        <small> - in category {categoryLink}</small>
      </span>
    </div>
  )
}

export default PostMeta;