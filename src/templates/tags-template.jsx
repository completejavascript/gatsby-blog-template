import React from "react";
import Helmet from "react-helmet";
import AdSense from "react-adsense";
import Layout from "../layout";
import Header from "../components/Header/Header";
import Tag from "../components/Tag/Tag";
import GithubComment from "../components/Comment/GithubComment";
import config from "../../data/SiteConfig";

const TagsTemplate = ({ pageContext }) => {
  const { tagList } = pageContext;
  const title = config.tagsHeader;

  return (
    <Layout>
      <Helmet>
        <title>{`${title} - ${config.siteTitle}`}</title>
      </Helmet>
      <Header title={title} />

      <main className="container margin-top-3 margin-bottom-3">
        {tagList && tagList.map((tag) => <Tag key={tag} content={tag} />)}

        {config.hasAdsense && config.adsenseUnits?.postBottom && (
          <AdSense.Google {...config.adsenseUnits?.postBottom} />
        )}

        <GithubComment />
      </main>
    </Layout>
  );
};

export default TagsTemplate;
