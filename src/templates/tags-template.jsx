import React from "react";
import Helmet from "react-helmet";
import AdSense from "react-adsense";
import Layout from "../layout";
import Header from "../components/Header/Header";
import Tag from "../components/Tag/Tag";
import MainContainer from "../components/MainContainer/MainContainer";
import { SidebarLeft, SidebarRight } from "../components/Sidebar/Sidebar";
import GithubComment from "../components/Comment/GithubComment";
import siteConfig from "../../data/SiteConfig";
import { useSlash } from "../utils/helpers";

const TagsTemplate = ({ pageContext }) => {
  const { tagList } = pageContext;
  const title = siteConfig.tagsHeader;
  const canonical = `${siteConfig.siteUrl}${siteConfig.pathPrefixTags}`;

  const content = (
    <>
      <Header title={title} />

      <p className="margin-top-2">
        Dưới đây là tổng hợp tất cả những thẻ <strong>tag</strong> từ các bài
        viết.
      </p>

      <section className="margin-top">
        {tagList && tagList.map((tag) => <Tag key={tag} content={tag} />)}
      </section>

      {siteConfig.hasAdsense && siteConfig.adsenseUnits?.postBottom && (
        <AdSense.Google {...siteConfig.adsenseUnits?.postBottom} />
      )}

      {process.env.NODE_ENV === "production" && <GithubComment />}
    </>
  );

  const sidebarLeft = <SidebarLeft />;
  const sidebarRight = <SidebarRight />;

  return (
    <Layout>
      <Helmet title={`${title} - ${siteConfig.siteTitle}`}>
        <link rel="canonical" href={useSlash(canonical)} />
      </Helmet>

      <MainContainer
        content={content}
        sidebarLeft={sidebarLeft}
        sidebarRight={sidebarRight}
      />
    </Layout>
  );
};

export default TagsTemplate;
