import React from "react";
import WidgetCategory from "./WidgetCategory";
import WidgetTag from "./WidgetTag";
import WidgetLatestPosts from "./WidgetLatestPosts";

const Sidebar = ({ tagList, categoryList, latestPostEdges }) => {
  return (
    <aside className="sidebar-container width-full">
      {latestPostEdges && (
        <WidgetLatestPosts latestPostEdges={latestPostEdges} />
      )}
      
      {categoryList && (
        <WidgetCategory categoryList={categoryList} />
      )}
      
      {tagList && (
        <WidgetTag tagList={tagList} />
      )}
    </aside>
  )
}

export default Sidebar;