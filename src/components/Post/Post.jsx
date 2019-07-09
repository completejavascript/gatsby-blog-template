import React from "react";
import UserInfo from "../UserInfo/UserInfo";
import Disqus from "../Disqus/Disqus";
import PostTags from "./PostTags";
import PostShare from "./PostShare";
import PostDate from "./PostDate";
import PostDivider from "./PostDivider";
import PostCategories from "./PostCategories";
import "./Post.scss";

const Post = ({ postNode, config, slug }) => {
  const post = postNode.frontmatter;
  if (!post.id) {
    post.id = slug;
  }
  if (!post.category_id) {
    post.category_id = config.postDefaultCategoryID;
  }

  return (
    <div className="post-container">
      <div className="meta-share-wrapper padding-top padding-bottom">
        <PostDate extraClass="meta-wrapper" date={post.date} /> 
        <PostShare extraClass="share-wrapper" postPath={slug} postNode={postNode} />
      </div>
      <PostDivider />
      <div className="padding-top padding-bottom" dangerouslySetInnerHTML={{ __html: postNode.html }} />
      <PostDivider />
      <div className="padding-top padding-bottom">
        <small>
          <PostCategories categories={post.categories} extraClass="block" />
          <PostTags tags={post.tags} extraClass="block" />
        </small>
      </div>
      <PostDivider />
      <div className="padding-top">
        <UserInfo config={config} />
      </div>
      <Disqus postNode={postNode} />
    </div>
  )
}

export default Post;