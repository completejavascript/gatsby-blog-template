import React from "react";
import WidgetLatestPosts from "./WidgetLatestPosts";
import config from "../../../data/SiteConfig";
import AdSense from "react-adsense";
import "./Sidebar.scss";

const Sidebar = ({
  postSlug,
  latestPostEdges = [],
  latestFreebieEdges = [],
  sameSeriesPosts = [],
  isLeft = false,
}) => {
  return (
    <aside
      className={`sidebar-container width-full ${
        config.sidebarSticky ? "height-full" : ""
      }`}
    >
      {sameSeriesPosts && sameSeriesPosts.length > 0 && (
        <>
          {config.hasAdsense && config.adsenseUnits?.sidebarTop && (
            <div className="width-full flex justify-content-center padding-top">
              <AdSense.Google {...config.adsenseUnits?.sidebarTop} />
            </div>
          )}
          <WidgetLatestPosts
            postSlug={postSlug}
            postEdges={sameSeriesPosts}
            title={config.sameSeriesPostsWidgetTitle}
          />
        </>
      )}

      {latestPostEdges && latestPostEdges.length > 0 && (
        <>
          {config.hasAdsense && config.adsenseUnits?.sidebarMiddle && (
            <div className="width-full flex justify-content-center padding-top">
              <AdSense.Google {...config.adsenseUnits?.sidebarMiddle} />
            </div>
          )}
          <WidgetLatestPosts
            postEdges={latestPostEdges.filter(
              (item) => item.node.fields.slug !== postSlug
            )}
            title={config.latestPostsWidgetTitle}
          />
        </>
      )}

      {latestFreebieEdges && latestFreebieEdges.length > 0 && (
        <>
          {config.hasAdsense && config.adsenseUnits?.sidebarMiddle2 && (
            <div className="width-full flex justify-content-center padding-top">
              <AdSense.Google {...config.adsenseUnits?.sidebarMiddle2} />
            </div>
          )}
          <WidgetLatestPosts
            postEdges={latestFreebieEdges.filter(
              (item) => item.node.fields.slug !== postSlug
            )}
            title={config.latestFreebiesWidgetTitle}
          />
        </>
      )}

      {config.hasAdsense &&
        config.adsenseUnits?.sidebarBottomRight &&
        isLeft == false && (
          <div className="position-sticky last-item">
            {config.hasAdsense && config.adsenseUnits?.sidebarBottomRight && (
              <div className="padding-top padding-bottom">
                <AdSense.Google {...config.adsenseUnits?.sidebarBottomRight} />
              </div>
            )}
          </div>
        )}

      {config.hasAdsense &&
        config.adsenseUnits?.sidebarBottomLeft &&
        isLeft == true && (
          <div className="position-sticky last-item">
            {config.hasAdsense && config.adsenseUnits?.sidebarBottomLeft && (
              <div className="padding-top padding-bottom">
                <AdSense.Google {...config.adsenseUnits?.sidebarBottomLeft} />
              </div>
            )}
          </div>
        )}
    </aside>
  );
};

export default Sidebar;
