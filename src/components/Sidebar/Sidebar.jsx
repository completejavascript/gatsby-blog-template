import React from "react";
import WidgetCategory from "./WidgetCategory";
import WidgetTag from "./WidgetTag";
import WidgetLatestPosts from "./WidgetLatestPosts";
import WidgetLinks from "./WidgetLinks";
import WidgetSearch from "./WidgetSearch";
import config from "../../../data/SiteConfig";
import AdSense from "react-adsense";

const Sidebar = ({ tagList, categoryList, latestPostEdges, links }) => {
  return (
    <aside
      className={`sidebar-container width-full ${
        config.sidebarSticky ? "height-full" : ""
      }`}
    >
      {config.hasAdsense && (
        <div className="width-full flex justify-content-center padding-top">
          <AdSense.Google {...config.adsenseUnits.sidebarTop} />
        </div>
      )}

      <WidgetSearch />

      {latestPostEdges && (
        <WidgetLatestPosts latestPostEdges={latestPostEdges} />
      )}

      {latestPostEdges && config.hasAdsense && (
        <div className="width-full flex justify-content-center padding-top">
          <AdSense.Google {...config.adsenseUnits.sidebarMiddle} />
        </div>
      )}

      {categoryList && <WidgetCategory categoryList={categoryList} />}

      {tagList && <WidgetTag tagList={tagList} />}

      {links && <WidgetLinks links={links} />}

      {config.hasAdsense && (
        <div className="position-sticky top-zero padding-top padding-bottom">
          <AdSense.Google {...config.adsenseUnits.sidebarBottom} />
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
