import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import Header from "../components/Header/Header";
import Page from "../components/Page/Page";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";
import AdSense from "react-adsense";

const DirectoryTemplate = ({ data, pageContext }) => {
  const { slug } = pageContext;
  const postNode = data.markdownRemark;
  const title = postNode.frontmatter.title;
  const content = <Page postNode={postNode} slug={slug} />;

  return (
    <Layout>
      <Helmet>
        <title>{`${title} - ${config.siteTitle}`}</title>
      </Helmet>
      <SEO postPath={slug} postNode={postNode} postSEO />
      <Header title={title} />

      <main className="directory-container">
        <div className="container">
          {config.hasAdsense && config.adsenseUnits.postTop && (
            <AdSense.Google {...config.adsenseUnits.postTop} />
          )}
        </div>

        <div className="content-wrapper padding-top-half padding-bottom-2">
          {content}
        </div>

        <div className="container">
          {config.hasAdsense && config.adsenseUnits.postBottom && (
            <AdSense.Google {...config.adsenseUnits.postBottom} />
          )}
        </div>
      </main>
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
