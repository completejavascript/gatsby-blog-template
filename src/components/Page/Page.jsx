import React from "react";

const Page = ({ postNode, slug }) => {
  const post = postNode.frontmatter;
  if (!post.id) {
    post.id = slug;
  }

  return (
    <div
      className="page-container padding-top padding-bottom"
      dangerouslySetInnerHTML={{ __html: postNode.html }}
    />
  );
};

export default Page;
