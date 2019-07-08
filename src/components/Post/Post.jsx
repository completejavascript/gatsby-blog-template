import React from "react";
import UserInfo from "../UserInfo/UserInfo";
import Disqus from "../Disqus/Disqus";
import PostTags from "./PostTags";
import PostDate from "./PostDate";
import PostShare from "./PostShare";
import PostFeature from "./PostFeature";

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
      <div className="padding-top-half padding-bottom flex justify-content-space-between">
        <PostDate date={post.date} />
        <PostShare postPath={slug} postNode={postNode} />
      </div>
      <PostFeature post={post} />
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