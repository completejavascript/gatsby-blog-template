import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import Header from "../components/Header/Header";
import MainContainer from "../components/MainContainer/MainContainer";
import Sidebar from "../components/Sidebar/Sidebar";
import PostListing from "../components/PostListing/PostListing";
import AutoLink from "../components/AutoLink/AutoLink";
import SEO from "../components/SEO/SEO";
import { getPostList, getTagCategoryList } from "../utils/helpers";
import config from "../../data/SiteConfig";

class Index extends React.Component {
  render() {
    const postEdges = this.props.data.allMarkdownRemark.edges;
    const postList = getPostList(postEdges);
    const { tagList, categoryList } = getTagCategoryList(postList);

    const content = (
      <>
        <PostListing
          postList={postList}
          hasThumbnail={config.homeHasThumbnail}
          hasLoadmore={config.homeHasLoadmore}
          postsPerPage={config.postsPerPage}
          numberLoadmore={config.numberLoadmore}
          btnLoadmore={config.btnLoadmore}
          forcePostsPerPage={config.homeHasLoadmore == false}
        />
        {!config.homeHasLoadmore && postList.length > config.postsPerPage && (
          <div className="more-articles-wrapper margin-top padding-top-half text-center">
            <AutoLink
              className="btn btn-primary"
              to={`${config.pathPrefixBlog}${config.pathPrefixPagination}/2`}
            >
              {config.homeMoreArticles}
            </AutoLink>
          </div>
        )}
      </>
    );

    const sidebar = (
      <Sidebar
        tagList={tagList}
        categoryList={categoryList}
        links={config.sidebarLinks}
      />
    );

    const headerTitle = config.homeHeader
      ? `${config.siteTitle} - ${config.homeHeader}`
      : `${config.siteTitle}`;

    return (
      <Layout>
        <div className="index-container">
          <Helmet title={config.siteTitle} />
          <SEO />
          <Header title={headerTitle} />
          <MainContainer content={content} sidebar={sidebar} />
        </div>
      </Layout>
    );
  }
}

export default Index;

/* eslint no-undef: "off" */
export const indexQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { template: { eq: "post" } } }
    ) {
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
            date
            cover {
              childImageSharp {
                gatsbyImageData(width: 660, quality: 100, layout: CONSTRAINED)
              }
            }
          }
        }
      }
    }
  }
`;
