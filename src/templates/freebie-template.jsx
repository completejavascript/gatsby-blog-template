import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import Header from "../components/Header/Header";
import MainContainer from "../components/MainContainer/MainContainer";
import Sidebar from "../components/Sidebar/Sidebar";
import PostListing from "../components/PostListing/PostListing";
import Pagination from "../components/Pagination/Pagination";
import { getPostList, useSlash } from "../utils/helpers";
import config from "../../data/SiteConfig";

const FreeBieTemplate = ({ data, pageContext }) => {
  const { latestFreebieEdges, currentPage, totalPages } = pageContext;

  const postEdges = data.allMarkdownRemark?.edges || [];
  const postList = getPostList(postEdges);

  const canonical =
    currentPage === 1
      ? `${config.siteUrl}${config.pathPrefixFreebie}`
      : `${config.siteUrl}${config.pathPrefixFreebie}${config.pathPrefixPagination}/${currentPage}`;

  const content = (
    <>
      <Header title={config.freebieHeader} />
      <PostListing
        postList={postList}
        hasThumbnail={config.freebieHasThumbnail}
        hasLoadmore={false}
      />
      <Pagination
        extraClass="padding-top-2 border-top border-color-light-grey"
        currentPage={currentPage}
        totalPages={totalPages}
        pathPrefix={config.pathPrefixFreebie}
        pathPrefixPagination={config.pathPrefixPagination}
      />
    </>
  );

  const sidebarLeft = <Sidebar isLeft={true} />;

  const sidebarRight = <Sidebar latestFreebieEdges={latestFreebieEdges} />;

  return (
    <Layout>
      <Helmet title={`${config.freebieHeader} - ${config.siteTitle}`}>
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

export default FreeBieTemplate;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query FreebiePage($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      limit: $limit
      skip: $skip
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { template: { eq: "freebie" } } }
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
