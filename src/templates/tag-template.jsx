import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import Header from "../components/Header/Header";
import MainContainer from "../components/MainContainer/MainContainer";
import { SidebarLeft, SidebarRight } from "../components/Sidebar/Sidebar";
import PostListing from "../components/PostListing/PostListing";
import Pagination from "../components/Pagination/Pagination";
import {
  getPostList,
  getTagPathWithoutTrailingSlash,
  useSlash,
} from "../utils/helpers";
import { siteConfig } from "../../data/config";

const TagTemplate = ({ data, pageContext }) => {
  const {
    tag,
    latestEdges,
    currentPage,
    totalPages,
    tagConfig,
    latestEdgesTitle,
  } = pageContext;

  const postEdges = data.allMarkdownRemark?.edges || [];
  const postList = getPostList(postEdges);

  const tagPath = getTagPathWithoutTrailingSlash(tag);
  const canonical =
    currentPage === 1
      ? `${siteConfig.siteUrl}${tagPath}`
      : `${siteConfig.siteUrl}${tagPath}${tagConfig.paginationPrefix}/${currentPage}`;

  const content = (
    <>
      <Header title={`${tagConfig.header} ${tag}`} />
      <PostListing
        postList={postList}
        hasThumbnail={tagConfig.postListingHasThumbnail}
        hasLoadmore={false}
      />
      <Pagination
        extraClass="padding-top-2 border-top border-color-light-grey"
        currentPage={currentPage}
        totalPages={totalPages}
        pathPrefix={tagPath}
        pathPrefixPagination={tagConfig.paginationPrefix}
      />
    </>
  );

  const sidebarLeft = <SidebarLeft />;

  const sidebarRight = (
    <SidebarRight
      latestEdges={latestEdges}
      latestEdgesTitle={latestEdgesTitle}
    />
  );

  return (
    <Layout>
      <Helmet title={`${tagConfig.header} ${tag} - ${siteConfig.siteTitle}`}>
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

export default TagTemplate;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query TagPage($tag: String, $skip: Int!, $limit: Int!, $template: String!) {
    allMarkdownRemark(
      limit: $limit
      skip: $skip
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { tags: { in: [$tag] }, template: { eq: $template } }
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
