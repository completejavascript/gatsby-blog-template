import React from "react";
import Helmet from "react-helmet";
import AdSense from "react-adsense";
import Layout from "../layout";
import Header from "../components/Header/Header";
import Tag from "../components/Tag/Tag";
import MainContainer from "../components/MainContainer/MainContainer";
import GithubComment from "../components/Comment/GithubComment";
import config from "../../data/SiteConfig";
import { useSlash } from "../utils/helpers";

const TagsTemplate = ({ pageContext }) => {
  const { tagList } = pageContext;
  const title = config.tagsHeader;
  const canonical = `${config.siteUrl}${config.pathPrefixTags}`;

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

      {config.hasAdsense && config.adsenseUnits?.postBottom && (
        <AdSense.Google {...config.adsenseUnits?.postBottom} />
      )}

      {process.env.NODE_ENV === "production" && <GithubComment />}
    </>
  );

  return (
    <Layout>
      <Helmet title={`${title} - ${config.siteTitle}`}>
        <link rel="canonical" href={useSlash(canonical)} />
      </Helmet>

      <MainContainer content={content} />
    </Layout>
  );
};

export default TagsTemplate;
