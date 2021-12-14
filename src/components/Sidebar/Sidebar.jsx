import React from "react";
import WidgetTag from "./WidgetTag";
import WidgetLatestPosts from "./WidgetLatestPosts";
import config from "../../../data/SiteConfig";
import AdSense from "react-adsense";
import "./Sidebar.scss";

const MIN_POST_FOR_ADS = 3;
const MIN_TAG_FOR_ADS = 10;

const Sidebar = ({
  tagList,
  latestPostEdges,
  latestFreebieEdges,
  postSlug,
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
          {config.hasAdsense &&
            config.adsenseUnits?.sidebarTop &&
            sameSeriesPosts.length > MIN_POST_FOR_ADS && (
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

      {latestPostEdges &&
        latestPostEdges.length > 0 &&
        latestPostEdges.length > MIN_POST_FOR_ADS && (
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
          {config.hasAdsense &&
            config.adsenseUnits?.sidebarMiddle2 &&
            latestFreebieEdges.length > MIN_POST_FOR_ADS && (
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
          {config.hasAdsense &&
            config.adsenseUnits?.sidebarMiddle3 &&
            tagList.length > MIN_TAG_FOR_ADS && (
              <div className="width-full flex justify-content-center padding-top">
                <AdSense.Google {...config.adsenseUnits?.sidebarMiddle3} />
              </div>
            )}
          <WidgetTag tagList={tagList} />
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
