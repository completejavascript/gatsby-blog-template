import React from "react";
import Article from "./Article";
import Sidebar from "../Sidebar/Sidebar";
import "./PostListing.scss";

const PostListing = ({ postList, tagList, categoryList, hasThumbnail }) => (
  <section className="list-post-container container">
    <div className="articles-wrapper padding-top-half padding-bottom-2">
      {postList.map(post => <Article key={post.title} post={post} hasThumbnail={hasThumbnail} />)}
    </div>
    <div className="sidebar-wrapper padding-bottom-2">
      <Sidebar location="on_list" tagList={tagList} categoryList={categoryList} />
    </div>
  </section>
)

export default PostListing;
