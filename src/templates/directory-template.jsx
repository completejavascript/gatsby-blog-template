import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import AdSense from "react-adsense";
import Header from "../components/Header/Header";
import Page from "../components/Page/Page";
import SEO from "../components/SEO/SEO";
import MainContainer from "../components/MainContainer/MainContainer";
// import GithubComment from "../components/Comment/GithubComment";
import { SidebarLeft, SidebarRightAds } from "../components/Sidebar/Sidebar";
import { siteConfig, adsConfig } from "../../data/config";
import { useSlash } from "../utils/helpers";

const DirectoryTemplate = ({ data, pageContext }) => {
  const { slug } = pageContext;
  const postNode = data.markdownRemark;
  const title = postNode?.frontmatter?.title;
  const canonical = `${siteConfig.siteUrl}${slug}`;

  const content = (
    <>
      <Header title={title} />
      {adsConfig.hasAdsense && adsConfig.adsenseUnits?.postTop && (
        <AdSense.Google {...adsConfig.adsenseUnits?.postTop} />
      )}

      <div className="directory-content-wrapper padding-top-half padding-bottom-2">
        {<Page postNode={postNode} slug={slug} />}
      </div>

      {adsConfig.hasAdsense && adsConfig.adsenseUnits?.postBottom && (
        <>
          <AdSense.Google {...adsConfig.adsenseUnits?.postBottom} />
          {/* {process.env.NODE_ENV === "production" && <GithubComment />} */}
        </>
      )}
    </>
  );

  return (
    <Layout>
      <Helmet title={`${title} - ${siteConfig.siteTitle}`}>
        <link rel="canonical" href={useSlash(canonical)} />
      </Helmet>
      <SEO postPath={slug} postNode={postNode} postSEO />

      <MainContainer
        className="directory-container"
        content={content}
        sidebarLeft={<SidebarLeft />}
        sidebarRight={<SidebarRightAds />}
      />
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
