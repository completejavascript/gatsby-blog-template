import React from "react";
import UserInfo from "../UserInfo/UserInfo";
import Disqus from "../Disqus/Disqus";
import PostTags from "./PostTags";
import PostShare from "./PostShare";
import PostMeta from "./PostMeta";
import PostDivider from "./PostDivider";
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
        <PostMeta extraClass="meta-wrapper" post={post} />
        <PostShare extraClass="share-wrapper" postPath={slug} postNode={postNode} />
      </div>
      <PostDivider />
      <div className="padding-top" dangerouslySetInnerHTML={{ __html: postNode.html }} />
      <div className="padding-top padding-bottom">
        <PostTags tags={post.tags} />
      </div>
      <UserInfo config={config} />
      <Disqus postNode={postNode} />
    </div>
  )
}

export default Post;