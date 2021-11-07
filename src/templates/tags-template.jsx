import React from "react";
import Helmet from "react-helmet";
import AdSense from "react-adsense";
import Layout from "../layout";
import Header from "../components/Header/Header";
import Tag from "../components/Tag/Tag";
import GithubComment from "../components/Comment/GithubComment";
import MainContainerWrapper from "../components/MainContainer/MainContainerWrapper";
import config from "../../data/SiteConfig";

const TagsTemplate = ({ pageContext }) => {
  const { tagList } = pageContext;
  const title = config.tagsHeader;
  const canonical = `${config.siteUrl}${config.pathPrefixTags}`;

  return (
    <Layout>
      <Helmet title={`${title} - ${config.siteTitle}`}>
        <link rel="canonical" href={canonical} />
      </Helmet>

      <MainContainerWrapper className="container margin-bottom-3">
        <Header title={title} />

        <section className="margin-top-2">
          {tagList && tagList.map((tag) => <Tag key={tag} content={tag} />)}
        </section>

        {config.hasAdsense && config.adsenseUnits?.postBottom && (
          <AdSense.Google {...config.adsenseUnits?.postBottom} />
        )}

        <GithubComment />
      </MainContainerWrapper>
    </Layout>
  );
};

export default TagsTemplate;
