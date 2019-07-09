import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import Header from "../components/Header/Header";
import MainContainer from "../components/MainContainer/MainContainer";
import Sidebar from "../components/Sidebar/Sidebar";
import PostListing from "../components/PostListing/PostListing";
import SEO from "../components/SEO/SEO";
import { getPostList, getTagCategoryList } from "../utils/helpers";
import config from "../../data/SiteConfig";

class Index extends React.Component {
  render() {
    const postEdges = this.props.data.allMarkdownRemark.edges;
    const postList = getPostList(postEdges);
    const { tagList, categoryList } = getTagCategoryList(postList);
    const content = <PostListing postList={postList} hasThumbnail={true} />;
    const sidebar = <Sidebar location="on_list" tagList={tagList} categoryList={categoryList} />;

    return (
      <Layout>
        <div className="index-container">
          <Helmet title={config.siteTitle} />
          <SEO />
          <Header title={`${config.siteTitle} - Home`} />
          <MainContainer content={content} sidebar={sidebar} />
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
      sort: { 
        fields: [fields___date], 
        order: DESC 
      }
      filter: { 
        frontmatter: { 
          template: { eq: "post" } 
        } 
      }
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
                fluid(maxWidth: 660) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
