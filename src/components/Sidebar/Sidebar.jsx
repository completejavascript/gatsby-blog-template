import React from "react";
import WidgetCategory from "./WidgetCategory";
import WidgetTag from "./WidgetTag";
import WidgetLatestPosts from "./WidgetLatestPosts";
import WidgetLinks from "./WidgetLinks";
import WidgetSearch from "./WidgetSearch";
import config from "../../../data/SiteConfig";
import AdSense from "react-adsense";
import "./Sidebar.scss";

const Sidebar = ({
  tagList,
  categoryList,
  latestPostEdges,
  latestFreebieEdges,
  links,
  isSimple = false,
}) => {
  return (
    <aside
      className={`sidebar-container width-full ${
        config.sidebarSticky ? "height-full" : ""
      }`}
    >
      {config.hasAdsense && config.adsenseUnits.sidebarTop && (
        <div className="width-full flex justify-content-center padding-top">
          <AdSense.Google {...config.adsenseUnits.sidebarTop} />
        </div>
      )}

      <WidgetSearch />

      {latestPostEdges && (
        <WidgetLatestPosts
          postEdges={latestPostEdges}
          title={config.latestPostsWidgetTitle}
        />
      )}

      {latestFreebieEdges && (
        <WidgetLatestPosts
          postEdges={latestFreebieEdges}
          title={config.latestFreebiesWidgetTitle}
        />
      )}

      {!isSimple && config.hasAdsense && config.adsenseUnits.sidebarMiddle && (
        <div className="width-full flex justify-content-center padding-top">
          <AdSense.Google {...config.adsenseUnits.sidebarMiddle} />
        </div>
      )}

      {!isSimple && categoryList && (
        <WidgetCategory categoryList={categoryList} />
      )}

      {!isSimple && tagList && <WidgetTag tagList={tagList} />}

      {!isSimple && links && <WidgetLinks links={links} />}

      {config.hasAdsense && config.adsenseUnits.sidebarBottom && (
        <div className="position-sticky top-zero padding-top padding-bottom">
          <AdSense.Google {...config.adsenseUnits.sidebarBottom} />
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
