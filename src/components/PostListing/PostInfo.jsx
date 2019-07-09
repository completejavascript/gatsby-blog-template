import React from "react";
import AutoLink from "../AutoLink/AutoLink";
import PostDate from "../Post/PostDate";

const PostInfo = ({ post, extraClass = "" }) => (
  <div className={`post-info-wrapper ${extraClass}`}>
    <AutoLink to={post.slug} key={post.title}>
      <h2><small>{post.title}</small></h2>
    </AutoLink> 
    <div className="margin-bottom-half">{post.excerpt}</div>
    <small><PostDate date={post.date} /></small>
  </div>
)

export default PostInfo;