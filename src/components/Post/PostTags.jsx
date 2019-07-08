import React from "react";
import Tag from "../Tag/Tag";

const PostTags = ({ tags }) => (
  <>
    {tags && (
      <div className="post-tag-container">
        {tags && tags.map(tag => <Tag key={tag} content={tag} />)}
      </div>    
    )}
  </>
);

export default PostTags;
