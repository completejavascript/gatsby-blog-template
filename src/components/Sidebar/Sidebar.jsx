import React from "react";
import WidgetCategory from "./WidgetCategory";
import WidgetTag from "./WidgetTag";
import WidgetLatestPosts from "./WidgetLatestPosts";
import WidgetLinks from "./WidgetLinks";

const Sidebar = ({ tagList, categoryList, latestPostEdges, links }) => {
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

      {links && (
        <WidgetLinks links={links} />
      )}
    </aside>
  )
}

export default Sidebar;