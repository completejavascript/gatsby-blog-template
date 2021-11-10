import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import Header from "../components/Header/Header";
import Page from "../components/Page/Page";
import SEO from "../components/SEO/SEO";
import MainContainer from "../components/MainContainer/MainContainer";
import GithubComment from "../components/Comment/GithubComment";
import config from "../../data/SiteConfig";
import AdSense from "react-adsense";

const DirectoryTemplate = ({ data, pageContext }) => {
  const { slug } = pageContext;
  const postNode = data.markdownRemark;
  const title = postNode?.frontmatter?.title;
  const canonical = `${config.siteUrl}${slug}`;

  const content = (
    <>
      <Header title={title} className="container" />

      {config.hasAdsense && config.adsenseUnits?.postTop && (
        <div className="container">
          <AdSense.Google {...config.adsenseUnits?.postTop} />
        </div>
      )}

      <div className="directory-content-wrapper padding-top-half padding-bottom-2">
        {<Page postNode={postNode} slug={slug} />}
      </div>

      {config.hasAdsense && config.adsenseUnits?.postBottom && (
        <div className="container">
          <AdSense.Google {...config.adsenseUnits?.postBottom} />
          {process.env.NODE_ENV === "production" && <GithubComment />}
        </div>
      )}
    </>
  );

  return (
    <Layout>
      <Helmet title={`${title} - ${config.siteTitle}`}>
        <link rel="canonical" href={canonical} />
      </Helmet>
      <SEO postPath={slug} postNode={postNode} postSEO />

      <MainContainer className="directory-container" content={content} />
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
