import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import Header from "../components/Header/Header";
import MainContainer from "../components/MainContainer/MainContainer";
import Sidebar from "../components/Sidebar/Sidebar";
import Page from "../components/Page/Page";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";
import { useSlash } from "../utils/helpers";

const PageTemplate = ({ data, pageContext }) => {
  const { slug, latestPostEdges, latestFreebieEdges } = pageContext;
  const postNode = data.markdownRemark;
  const title = postNode?.frontmatter?.title;
  const canonical = `${config.siteUrl}${slug}`;

  const content = (
    <>
      <Header title={title} />
      <Page postNode={postNode} slug={slug} />
    </>
  );

  const sidebarRight = (
    <Sidebar
      latestPostEdges={latestPostEdges}
      latestFreebieEdges={latestFreebieEdges}
    />
  );

  return (
    <Layout>
      <Helmet title={`${title} - ${config.siteTitle}`}>
        <link rel="canonical" href={useSlash(canonical)} />
      </Helmet>
      <SEO postPath={slug} postNode={postNode} postSEO />
      <MainContainer content={content} sidebarRight={sidebarRight} />
    </Layout>
  );
};

export default PageTemplate;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPageBySlug($slug: String!) {
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
