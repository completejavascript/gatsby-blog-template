import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import MainContainer from "../components/MainContainer/MainContainer";
import Sidebar from "../components/Sidebar/Sidebar";
import PostListing from "../components/PostListing/PostListing";
import Pagination from "../components/Pagination/Pagination";
import { getPostList } from "../utils/helpers";
import config from "../../data/SiteConfig";

const BlogTemplate = ({ data, pageContext }) => {
  const { categoryList, tagList, latestPostEdges, currentPage, totalPages } =
    pageContext;
  const postEdges = data.allMarkdownRemark.edges;
  const postList = getPostList(postEdges);
  const content = (
    <>
      <PostListing
        postList={postList}
        hasThumbnail={config.blogHasThumbnail}
        hasLoadmore={false}
      />
      <Pagination
        extraClass="margin-top padding-top-half"
        currentPage={currentPage}
        totalPages={totalPages}
        pathPrefix={config.pathPrefixBlog}
        pathPrefixPagination={config.pathPrefixPagination}
      />
    </>
  );
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
      <div className="blog-container">
        <Helmet title={`${config.blogHeader} - ${config.siteTitle}`} />
        <MainContainer content={content} sidebar={sidebar} />
      </div>
    </Layout>
  );
};

export default BlogTemplate;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPage($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      limit: $limit
      skip: $skip
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { template: { eq: "post" } } }
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
                gatsbyImageData(width: 660, quality: 100, layout: CONSTRAINED)
              }
            }
            date
          }
        }
      }
    }
  }
`;
