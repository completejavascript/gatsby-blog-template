import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import Header from "../components/Header/Header";
import MainContainer from "../components/MainContainer/MainContainer";
import Sidebar from "../components/Sidebar/Sidebar";
import PostListing from "../components/PostListing/PostListing";
import { getPostList } from "../utils/helpers";
import config from "../../data/SiteConfig";

const TagTemplate = ({ data, pageContext}) => {
  const { tag, tagList, categoryList, latestPostEdges } = pageContext;
  const postEdges = data.allMarkdownRemark.edges;
  const postList = getPostList(postEdges);
  const content = <PostListing postList={postList} hasThumbnail={true} />;
  const sidebar = <Sidebar 
    tagList={tagList} 
    categoryList={categoryList} 
    latestPostEdges={latestPostEdges}
  />;

  return (
    <Layout>
      <div className="tag-container">
        <Helmet title={`Posts tagged as "${tag}" - ${config.siteTitle}`} />
        <Header title={`Posts tagged as "${tag}"`} />
        <MainContainer content={content} sidebar={sidebar} />
      </div>
    </Layout>
  );
}

export default TagTemplate;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query TagPage($tag: String, $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      limit: $limit
      skip: $skip
      sort: { 
        fields: [fields___date], 
        order: DESC 
      }
      filter: { 
        frontmatter: { 
          tags: { in: [$tag] }, 
          template: { eq: "post" } 
        } 
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
            categories
            cover {
              childImageSharp {
                fluid(maxWidth: 660) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            date
          }
        }
      }
    }
  }
`;
