import React from "react";
import WidgetTag from "./WidgetTag";
import WidgetLatestPosts from "./WidgetLatestPosts";
import WidgetLinks from "./WidgetLinks";
import config from "../../../data/SiteConfig";
import AdSense from "react-adsense";
import "./Sidebar.scss";

const Sidebar = ({
  tagList,
  latestPostEdges,
  latestFreebieEdges,
  latestRelatedEdges,
  links,
  isSimple = false,
}) => {
  return (
    <aside
      className={`sidebar-container width-full ${
        config.sidebarSticky ? "height-full" : ""
      }`}
    >
      {config.hasAdsense && config.adsenseUnits?.sidebarTop && (
        <div className="width-full flex justify-content-center padding-top">
          <AdSense.Google {...config.adsenseUnits?.sidebarTop} />
        </div>
      )}

      {latestPostEdges && latestPostEdges.length > 0 && (
        <WidgetLatestPosts
          postEdges={latestPostEdges}
          title={config.latestPostsWidgetTitle}
        />
      )}

      {latestFreebieEdges && latestFreebieEdges.length > 0 && (
        <WidgetLatestPosts
          postEdges={latestFreebieEdges}
          title={config.latestFreebiesWidgetTitle}
        />
      )}

      {!isSimple && config.hasAdsense && config.adsenseUnits?.sidebarMiddle && (
        <div className="width-full flex justify-content-center padding-top">
          <AdSense.Google {...config.adsenseUnits?.sidebarMiddle} />
        </div>
      )}

      {!isSimple && tagList && tagList.length > 0 && (
        <WidgetTag tagList={tagList} />
      )}

      {!isSimple && links && links.length > 0 && <WidgetLinks links={links} />}

      {((latestRelatedEdges && latestRelatedEdges.length > 0) ||
        (config.hasAdsense && config.adsenseUnits?.sidebarBottom)) && (
        <div className="position-sticky top-zero">
          {latestRelatedEdges && latestRelatedEdges.length > 0 && (
            <WidgetLatestPosts
              postEdges={latestRelatedEdges}
              title={config.latestRelatedWidgetTitle}
            />
          )}

          {config.hasAdsense && config.adsenseUnits?.sidebarBottom && (
            <div className="padding-top padding-bottom">
              <AdSense.Google {...config.adsenseUnits?.sidebarBottom} />
            </div>
          )}
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
