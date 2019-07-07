import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import PostListing from "../components/PostListing/PostListing";
import Header from "../components/Header/Header";
import SEO from "../components/SEO/SEO";
import { getPostList, getTagCategoryList } from "../utils/helpers";
import config from "../../data/SiteConfig";

class Index extends React.Component {
  render() {
    const postEdges = this.props.data.allMarkdownRemark.edges;
    const postList = getPostList(postEdges);
    const { tagList, categoryList } = getTagCategoryList(postList);

    return (
      <Layout>
        <div className="index-container">
          <Helmet title={config.siteTitle} />
          <SEO />
          <Header title={`${config.siteTitle} - Home`} />
          <PostListing 
            postList={postList}
            tagList={tagList}
            categoryList={categoryList} 
            hasThumbnail={true}
          />
        </div>
      </Layout>
    );
  }
}

export default Index;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [fields___date], order: DESC }
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
            category
            cover {
              childImageSharp {
                fixed(width: 300) {
                  ...GatsbyImageSharpFixed
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
