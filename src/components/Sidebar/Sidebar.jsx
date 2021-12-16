import React from "react";
import WidgetLatestPosts from "./WidgetLatestPosts";
import { adsConfig, sidebarConfig } from "../../../data/config";
import AdSense from "react-adsense";
import "./Sidebar.scss";

function SidebarContainer({ children }) {
  return (
    <aside
      className={`sidebar-container width-full ${
        sidebarConfig.sidebarSticky ? "height-full" : ""
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
          {adsConfig.hasAdsense && adsConfig.adsenseUnits?.sidebarTop && (
            <div className="width-full flex justify-content-center padding-top">
              <AdSense.Google {...adsConfig.adsenseUnits?.sidebarTop} />
            </div>
          )}
          <WidgetLatestPosts
            postSlug={postSlug}
            postEdges={sameSeriesPosts}
            title={sidebarConfig.sameSeriesPostsTitle}
          />
        </>
      )}

      {adsConfig.hasAdsense && adsConfig.adsenseUnits?.sidebarBottomLeft && (
        <div className="position-sticky last-item">
          <div className="padding-top padding-bottom">
            <AdSense.Google {...adsConfig.adsenseUnits?.sidebarBottomLeft} />
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
  const latestEdgesFilter = latestEdges.filter(
    (item) => item.node.fields.slug !== postSlug
  );

  return (
    <SidebarContainer>
      {sameSeriesPosts && sameSeriesPosts.length > 0 && (
        <>
          {adsConfig.hasAdsense && adsConfig.adsenseUnits?.sidebarTop && (
            <div className="width-full flex justify-content-center padding-top">
              <AdSense.Google {...adsConfig.adsenseUnits?.sidebarTop} />
            </div>
          )}
          <WidgetLatestPosts
            postSlug={postSlug}
            postEdges={sameSeriesPosts}
            title={adsConfig.sameSeriesPostsWidgetTitle}
          />
        </>
      )}

      {latestEdgesFilter && latestEdgesFilter.length > 0 && (
        <>
          {adsConfig.hasAdsense && adsConfig.adsenseUnits?.sidebarMiddle && (
            <div className="width-full flex justify-content-center padding-top">
              <AdSense.Google {...adsConfig.adsenseUnits?.sidebarMiddle} />
            </div>
          )}
          <WidgetLatestPosts
            postEdges={latestEdgesFilter}
            title={latestEdgesTitle}
          />
        </>
      )}

      {adsConfig.hasAdsense && adsConfig.adsenseUnits?.sidebarBottomRight && (
        <div className="position-sticky last-item padding-top padding-bottom">
          <AdSense.Google {...adsConfig.adsenseUnits?.sidebarBottomRight} />
        </div>
      )}
    </SidebarContainer>
  );
}

export { SidebarLeft, SidebarRight };
