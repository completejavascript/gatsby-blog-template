import React from "react";
import AutoLink from "../AutoLink/AutoLink";
import { formatDate } from "../../utils/helpers";

const PostInfo = ({ post, extraClass }) => (
  <div className={extraClass}>
    <AutoLink to={post.slug} key={post.title}>
      <h2><small>{post.title}</small></h2>
    </AutoLink> 
    <div className="margin-bottom-half">{post.excerpt}</div>
    <div className="text-description">
      <small>Posted on {formatDate(post.date)}</small>
    </div>
  </div>
)

export default PostInfo;