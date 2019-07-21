import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import Header from "../components/Header/Header";
import MainContainer from "../components/MainContainer/MainContainer";
import Sidebar from "../components/Sidebar/Sidebar";
import Post from "../components/Post/Post";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";

const PostTemplate = ({ data, pageContext }) => {
  const { slug, tagList, categoryList, latestPostEdges } = pageContext;
  const postNode = data.markdownRemark;
  const title = postNode.frontmatter.title;
  const content = <Post postNode={postNode} config={config} slug={slug} />;
  const sidebar = <Sidebar 
    tagList={tagList} 
    categoryList={categoryList}
    latestPostEdges={latestPostEdges} 
    links={config.sidebarLinks}
  />;

  return (
    <Layout>
      <Helmet>
        <title>{`${title} - ${config.siteTitle}`}</title>
      </Helmet>
      <SEO postPath={slug} postNode={postNode} postSEO />
      <Header title={title} />
      <MainContainer content={content} sidebar={sidebar} />
    </Layout>
  );
}

export default PostTemplate;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        date
        categories
        tags
        description
        keywords
        cover {
          childImageSharp {
            fixed(width: 660, quality: 100) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
      fields {
        slug
        date
      }
    }
  }
`;
