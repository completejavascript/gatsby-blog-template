import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import Header from "../components/Header/Header";
import MainContainer from "../components/MainContainer/MainContainer";
import Sidebar from "../components/Sidebar/Sidebar";
import PostListing from "../components/PostListing/PostListing";
import Pagination from "../components/Pagination/Pagination";
import {
  getPostList,
  getCategoryPathWithoutTrailingSlash,
} from "../utils/helpers";
import config from "../../data/SiteConfig";

const CategoryTemplate = ({ data, pageContext }) => {
  const {
    category,
    categoryList,
    tagList,
    latestPostEdges,
    currentPage,
    totalPages,
  } = pageContext;
  const postEdges = data.allMarkdownRemark.edges;
  const postList = getPostList(postEdges);
  const content = (
    <>
      <PostListing
        postList={postList}
        hasThumbnail={config.categoryHasThumbnail}
        hasLoadmore={false}
      />
      <Pagination
        extraClass="margin-top padding-top-half"
        currentPage={currentPage}
        totalPages={totalPages}
        pathPrefix={getCategoryPathWithoutTrailingSlash(category)}
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
      <div className="category-container">
        <Helmet
          title={`${config.categoryHeader} ${category} - ${config.siteTitle}`}
        />
        <Header title={`${config.categoryHeader} ${category}`} />
        <MainContainer content={content} sidebar={sidebar} />
      </div>
    </Layout>
  );
};

export default CategoryTemplate;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query CategoryPage($category: String, $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      limit: $limit
      skip: $skip
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: {
          categories: { in: [$category] }
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
