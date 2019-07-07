import React from "react";
import WidgetCategory from "./WidgetCategory";
import WidgetTag from "./WidgetTag";

const LOCATION_ON_LIST = "on_list";
const LOCATION_ON_POST = "on_post";

const Sidebar = ({ location, tagList, categoryList }) => {
  return (
    <aside className="sidebar-container width-full">
      {location === LOCATION_ON_LIST && (
        <>
          <WidgetCategory categoryList={categoryList} />
          <WidgetTag tagList={tagList} />
        </>
      )}
  
      {location === LOCATION_ON_POST && (
        <>
          <WidgetCategory categoryList={categoryList} />
          <WidgetTag tagList={tagList} />
        </>
      )}
    </aside>
  )
}

export default Sidebar;