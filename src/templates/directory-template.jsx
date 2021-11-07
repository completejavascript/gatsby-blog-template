import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import Header from "../components/Header/Header";
import Page from "../components/Page/Page";
import SEO from "../components/SEO/SEO";
import MainContainerWrapper from "../components/MainContainer/MainContainerWrapper";
import GithubComment from "../components/Comment/GithubComment";
import config from "../../data/SiteConfig";
import AdSense from "react-adsense";

const DirectoryTemplate = ({ data, pageContext }) => {
  const { slug } = pageContext;
  const postNode = data.markdownRemark;
  const title = postNode?.frontmatter?.title;
  const content = <Page postNode={postNode} slug={slug} />;
  const canonical = `${config.siteUrl}${slug}`;

  return (
    <Layout>
      <Helmet title={`${title} - ${config.siteTitle}`}>
        <link rel="canonical" href={canonical} />
      </Helmet>
      <SEO postPath={slug} postNode={postNode} postSEO />

      <MainContainerWrapper className="directory-container">
        <Header title={title} className="container" />

        {config.hasAdsense && config.adsenseUnits?.postTop && (
          <div className="container">
            <AdSense.Google {...config.adsenseUnits?.postTop} />
          </div>
        )}

        <div className="content-wrapper padding-top-half padding-bottom-2">
          {content}
        </div>

        {config.hasAdsense && config.adsenseUnits?.postBottom && (
          <div className="container">
            <AdSense.Google {...config.adsenseUnits?.postBottom} />
            <GithubComment />
          </div>
        )}
      </MainContainerWrapper>
    </Layout>
  );
};

export default DirectoryTemplate;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query DirectoryPageBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        description
      }
      fields {
        slug
      }
    }
  }
`;
