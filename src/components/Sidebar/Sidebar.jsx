import React from "react";
import WidgetLatestPosts from "./WidgetLatestPosts";
import config from "../../../data/SiteConfig";
import AdSense from "react-adsense";
import "./Sidebar.scss";

function SidebarContainer({ children }) {
  return (
    <aside
      className={`sidebar-container width-full ${
        config.sidebarSticky ? "height-full" : ""
      }`}
    >
      {children}
    </aside>
  );
}

function SidebarLeft(postSlug, sameSeriesPosts = []) {
  return (
    <SidebarContainer>
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

      {config.hasAdsense && config.adsenseUnits?.sidebarBottomLeft && (
        <div className="position-sticky last-item">
          <div className="padding-top padding-bottom">
            <AdSense.Google {...config.adsenseUnits?.sidebarBottomLeft} />
          </div>
        </div>
      )}
    </SidebarContainer>
  );
}

function SidebarRight(
  postSlug,
  latestPostEdges = [],
  latestFreebieEdges = [],
  sameSeriesPosts = []
) {
  return (
    <SidebarContainer>
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

      {config.hasAdsense && config.adsenseUnits?.sidebarBottomRight && (
        <div className="position-sticky last-item padding-top padding-bottom">
          <AdSense.Google {...config.adsenseUnits?.sidebarBottomRight} />
        </div>
      )}
    </SidebarContainer>
  );
}

export { SidebarLeft, SidebarRight };
