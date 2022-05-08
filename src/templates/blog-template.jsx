import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import Header from "../components/Header/Header";
import MainContainer from "../components/MainContainer/MainContainer";
import { SidebarLeft, SidebarRight } from "../components/Sidebar/Sidebar";
import PostListing from "../components/PostListing/PostListing";
import Pagination from "../components/Pagination/Pagination";
import { getPostList } from "../utils/helpers";
import { siteConfig } from "../../data/config";
import { useSlash } from "../utils/helpers";

const BlogTemplate = ({ data, pageContext }) => {
  const {
    latestEdges,
    currentPage,
    totalPages,
    templateConfig,
    tagList = [],
  } = pageContext;

  const postEdges = data.allMarkdownRemark?.edges || [];
  const postList = getPostList(postEdges);

  const canonical =
    currentPage === 1
      ? `${siteConfig.siteUrl}${templateConfig.pathPrefix}`
      : `${siteConfig.siteUrl}${templateConfig.pathPrefix}${templateConfig.paginationPrefix}/${currentPage}`;

  const content = (
    <>
      <Header title={templateConfig.header} />
      <PostListing
        postList={postList}
        hasThumbnail={templateConfig.postListingHasThumbnail}
        hasLoadmore={false}
      />
      <Pagination
        extraClass="padding-top-2 border-top border-color-light-grey"
        currentPage={currentPage}
        totalPages={totalPages}
        pathPrefix={templateConfig.pathPrefix}
        pathPrefixPagination={templateConfig.paginationPrefix}
      />
    </>
  );

  const sidebarLeft = <SidebarLeft tagList={tagList} />;

  const sidebarRight = (
    <SidebarRight
      latestEdges={latestEdges}
      latestEdgesTitle={templateConfig.sidebarLatestPostsTitle}
    />
  );

  return (
    <Layout>
      <Helmet title={`${templateConfig.header} - ${siteConfig.siteTitle}`}>
        <link rel="canonical" href={useSlash(canonical)} />
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
  query BlogPage($skip: Int!, $limit: Int!, $template: String!) {
    allMarkdownRemark(
      limit: $limit
      skip: $skip
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { template: { eq: $template } } }
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
