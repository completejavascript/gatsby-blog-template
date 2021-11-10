import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import Header from "../components/Header/Header";
import MainContainer from "../components/MainContainer/MainContainer";
import Sidebar from "../components/Sidebar/Sidebar";
import PostListing from "../components/PostListing/PostListing";
import Pagination from "../components/Pagination/Pagination";
import { getPostList } from "../utils/helpers";
import config from "../../data/SiteConfig";

const BlogTemplate = ({ data, pageContext }) => {
  const {
    tagList,
    latestPostEdges,
    latestFreebieEdges,
    currentPage,
    totalPages,
  } = pageContext;

  const postEdges = data.allMarkdownRemark?.edges || [];
  const postList = getPostList(postEdges);

  const canonical =
    currentPage === 1
      ? `${config.siteUrl}${config.pathPrefixBlog}`
      : `${config.siteUrl}${config.pathPrefixBlog}${config.pathPrefixPagination}/${currentPage}`;

  const content = (
    <>
      <Header title={config.blogHeader} />
      <PostListing
        postList={postList}
        hasThumbnail={config.blogHasThumbnail}
        hasLoadmore={false}
      />
      <Pagination
        extraClass="padding-top-2 border-top border-color-light-grey"
        currentPage={currentPage}
        totalPages={totalPages}
        pathPrefix={config.pathPrefixBlog}
        pathPrefixPagination={config.pathPrefixPagination}
      />
    </>
  );

  const sidebarLeft = <Sidebar tagList={tagList} isLeft={true} />;

  const sidebarRight = (
    <Sidebar
      latestPostEdges={latestPostEdges}
      latestFreebieEdges={latestFreebieEdges}
    />
  );

  return (
    <Layout>
      <Helmet title={`${config.blogHeader} - ${config.siteTitle}`}>
        <link rel="canonical" href={canonical} />
      </Helmet>
      <MainContainer
        content={content}
        sidebarLeft={sidebarLeft}
        sidebarRight={sidebarRight}
      />
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
