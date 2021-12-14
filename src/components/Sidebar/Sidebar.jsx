import React from "react";
import WidgetLatestPosts from "./WidgetLatestPosts";
import siteConfig from "../../../data/SiteConfig";
import AdSense from "react-adsense";
import "./Sidebar.scss";

function SidebarContainer({ children }) {
  return (
    <aside
      className={`sidebar-container width-full ${
        siteConfig.sidebarSticky ? "height-full" : ""
      }`}
    >
      {children}
    </aside>
  );
}

function SidebarLeft({ postSlug, sameSeriesPosts = [] }) {
  return (
    <SidebarContainer>
      {sameSeriesPosts && sameSeriesPosts.length > 0 && (
        <>
          {siteConfig.hasAdsense && siteConfig.adsenseUnits?.sidebarTop && (
            <div className="width-full flex justify-content-center padding-top">
              <AdSense.Google {...siteConfig.adsenseUnits?.sidebarTop} />
            </div>
          )}
          <WidgetLatestPosts
            postSlug={postSlug}
            postEdges={sameSeriesPosts}
            title={siteConfig.sameSeriesPostsWidgetTitle}
          />
        </>
      )}

      {siteConfig.hasAdsense && siteConfig.adsenseUnits?.sidebarBottomLeft && (
        <div className="position-sticky last-item">
          <div className="padding-top padding-bottom">
            <AdSense.Google {...siteConfig.adsenseUnits?.sidebarBottomLeft} />
          </div>
        </div>
      )}
    </SidebarContainer>
  );
}

function SidebarRight({
  postSlug,
  latestEdgesTitle,
  latestEdges = [],
  sameSeriesPosts = [],
}) {
  return (
    <SidebarContainer>
      {sameSeriesPosts && sameSeriesPosts.length > 0 && (
        <>
          {siteConfig.hasAdsense && siteConfig.adsenseUnits?.sidebarTop && (
            <div className="width-full flex justify-content-center padding-top">
              <AdSense.Google {...siteConfig.adsenseUnits?.sidebarTop} />
            </div>
          )}
          <WidgetLatestPosts
            postSlug={postSlug}
            postEdges={sameSeriesPosts}
            title={siteConfig.sameSeriesPostsWidgetTitle}
          />
        </>
      )}

      {latestEdges && latestEdges.length > 0 && (
        <>
          {siteConfig.hasAdsense && siteConfig.adsenseUnits?.sidebarMiddle && (
            <div className="width-full flex justify-content-center padding-top">
              <AdSense.Google {...siteConfig.adsenseUnits?.sidebarMiddle} />
            </div>
          )}
          <WidgetLatestPosts
            postEdges={latestEdges.filter(
              (item) => item.node.fields.slug !== postSlug
            )}
            title={latestEdgesTitle}
          />
        </>
      )}

      {siteConfig.hasAdsense && siteConfig.adsenseUnits?.sidebarBottomRight && (
        <div className="position-sticky last-item padding-top padding-bottom">
          <AdSense.Google {...siteConfig.adsenseUnits?.sidebarBottomRight} />
        </div>
      )}
    </SidebarContainer>
  );
}

export { SidebarLeft, SidebarRight };
