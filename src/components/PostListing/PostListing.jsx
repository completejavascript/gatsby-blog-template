import React from "react";
import Article from "./Article";

const PostListing = ({ postList, hasThumbnail }) => (
  <>
    {
      postList.map(post => (
        <Article key={post.title} post={post} hasThumbnail={hasThumbnail} />
      ))
    }
  </>
)

export default PostListing;
