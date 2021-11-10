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
  postSlug,
  sameSeriesPosts = [],
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

      {tagList && tagList.length > 0 && (
        <>
          {config.hasAdsense && config.adsenseUnits?.sidebarMiddle3 && (
            <div className="width-full flex justify-content-center padding-top">
              <AdSense.Google {...config.adsenseUnits?.sidebarMiddle3} />
            </div>
          )}
          <WidgetTag tagList={tagList} />
        </>
      )}

      {((latestRelatedEdges && latestRelatedEdges.length > 0) ||
        (config.hasAdsense && config.adsenseUnits?.sidebarBottom)) && (
        <div className="position-sticky last-item">
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
