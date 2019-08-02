import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import Header from "../components/Header/Header";
import MainContainer from "../components/MainContainer/MainContainer";
import Sidebar from "../components/Sidebar/Sidebar";
import PostListing from "../components/PostListing/PostListing";
import Pagination from "../components/Pagination/Pagination";
import { getPostList, getTagPath } from "../utils/helpers";
import config from "../../data/SiteConfig";

const TagTemplate = ({ data, pageContext}) => {
  const { 
    tag, tagList, categoryList, latestPostEdges, currentPage, totalPages 
  } = pageContext;
  const postEdges = data.allMarkdownRemark.edges;
  const postList = getPostList(postEdges);
  const content = (
    <>
      <PostListing 
        postList={postList} 
        hasThumbnail={config.tagHasThumbnail} 
        hasLoadmore={false} 
      />
      <Pagination 
        extraClass="margin-top padding-top-half"
        currentPage={currentPage}
        totalPages={totalPages}
        pathPrefix={getTagPath(tag)}
        pathPrefixPagination={config.pathPrefixPagination}
      />
    </>
  )
  const sidebar = (
    <Sidebar 
      tagList={tagList} 
      categoryList={categoryList} 
      latestPostEdges={latestPostEdges}
      links={config.sidebarLinks}
    />
  );

  return (
    <Layout>
      <div className="tag-container">
        <Helmet title={`${config.tagHeader} ${tag} - ${config.siteTitle}`} />
        <Header title={`${config.tagHeader} ${tag}`} />
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
                fluid(maxWidth: 660, quality: 100) {
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
