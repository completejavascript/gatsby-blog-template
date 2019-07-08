import React from "react";
import Article from "./Article";

const PostListing = ({ postList, hasThumbnail }) => (
  <div className="post-listing-container">
    {
      postList.map(post => (
        <Article key={post.title} post={post} hasThumbnail={hasThumbnail} />
      ))
    }
  </div>
)

export default PostListing;
