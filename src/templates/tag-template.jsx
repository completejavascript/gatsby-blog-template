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

const TagTemplate = ({ data, pageContext }) => {
  const {
    tag,
    tagList,
    latestPostEdges,
    latestFreebieEdges,
    currentPage,
    totalPages,
  } = pageContext;

  const postEdges = data.allMarkdownRemark?.edges || [];
  const postList = getPostList(postEdges);

  const tagPath = getTagPath(tag);
  const canonical =
    currentPage === 1
      ? `${config.siteUrl}${tagPath}`
      : `${config.siteUrl}${tagPath}${config.pathPrefixPagination}/${currentPage}`;

  const content = (
    <>
      <Header title={`${config.tagHeader} ${tag}`} />
      <PostListing
        postList={postList}
        hasThumbnail={config.tagHasThumbnail}
        hasLoadmore={false}
      />
      <Pagination
        extraClass="margin-top padding-top-half"
        currentPage={currentPage}
        totalPages={totalPages}
        pathPrefix={tagPath}
        pathPrefixPagination={config.pathPrefixPagination}
      />
    </>
  );

  const sidebar = (
    <Sidebar
      tagList={tagList}
      latestPostEdges={latestPostEdges}
      latestFreebieEdges={latestFreebieEdges}
      links={config.sidebarLinks}
    />
  );

  return (
    <Layout>
      <Helmet title={`${config.tagHeader} ${tag} - ${config.siteTitle}`}>
        <link rel="canonical" href={canonical} />
      </Helmet>
      <MainContainer content={content} sidebar={sidebar} />
    </Layout>
  );
};

export default TagTemplate;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query TagPage($tag: String, $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      limit: $limit
      skip: $skip
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { tags: { in: [$tag] }, template: { eq: "post" } }
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
