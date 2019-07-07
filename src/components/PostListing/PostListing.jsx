import React from "react";
import AutoLink from "../AutoLink/AutoLink";

const PostListing = (props) => {
  const postList = props.postEdges.map(postEdge => {
    return {
      path: postEdge.node.fields.slug,
      tags: postEdge.node.frontmatter.tags,
      cover: postEdge.node.frontmatter.cover,
      title: postEdge.node.frontmatter.title,
      date: postEdge.node.fields.date,
      excerpt: postEdge.node.excerpt,
      timeToRead: postEdge.node.timeToRead
    };
  });

  return (
    <div>
      {postList.map(post => (
        <AutoLink to={post.path} key={post.title}>
          <h1>{post.title}</h1>
        </AutoLink>
      ))}
    </div>
  );
}

export default PostListing;
