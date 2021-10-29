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
  const {
    slug,
    tagList,
    latestPostEdges,
    latestFreebieEdges,
    nextTitle,
    nextSlug,
    prevTitle,
    prevSlug,
  } = pageContext;

  const postNode = data.markdownRemark;

  // Get the 5 random related posts
  const uniqueRelatedPosts = {};
  (data.relatedTags?.edges || [])
    .filter((item) => item.node?.fields?.slug !== postNode?.fields?.slug)
    .forEach((item) => {
      if (!uniqueRelatedPosts[item.node?.fields?.slug]) {
        uniqueRelatedPosts[item.node?.fields?.slug] = item;
      }
    });
  const latestRelatedEdges = Object.values(uniqueRelatedPosts)
    .sort((a, b) => 0.5 - Math.random())
    .slice(0, config.numberLatestRelatedPost);
  //

  const title = postNode?.frontmatter?.title;

  const content = (
    <Post
      postNode={postNode}
      config={config}
      slug={slug}
      nextTitle={nextTitle}
      nextSlug={nextSlug}
      prevTitle={prevTitle}
      prevSlug={prevSlug}
    />
  );

  const sidebar = (
    <Sidebar
      tagList={tagList}
      latestPostEdges={latestPostEdges}
      latestFreebieEdges={latestFreebieEdges}
      latestRelatedEdges={latestRelatedEdges}
      links={config.sidebarLinks}
    />
  );

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
};

export default PostTemplate;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!, $template: String!, $tags: [String!]) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        directory
        title
        date
        tags
        description
        keywords
        cover {
          childImageSharp {
            gatsbyImageData(width: 660, quality: 100, layout: FIXED)
          }
        }
        update
      }
      fields {
        slug
        date
      }
    }
    relatedTags: allMarkdownRemark(
      limit: 8
      sort: { fields: [frontmatter___update], order: DESC }
      filter: {
        frontmatter: { tags: { in: $tags }, template: { eq: $template } }
      }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            cover {
              childImageSharp {
                gatsbyImageData(width: 660, quality: 100, layout: CONSTRAINED)
              }
            }
            date
            update
          }
        }
      }
    }
  }
`;
