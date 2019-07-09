import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import Header from "../components/Header/Header";
import MainContainer from "../components/MainContainer/MainContainer";
import Sidebar from "../components/Sidebar/Sidebar";
import PostListing from "../components/PostListing/PostListing";
import { getPostList } from "../utils/helpers";
import config from "../../data/SiteConfig";

export default class TagTemplate extends React.Component {
  render() {
    const { tag, tagList, categoryList } = this.props.pageContext;
    const postEdges = this.props.data.allMarkdownRemark.edges;
    const postList = getPostList(postEdges);
    const content = <PostListing postList={postList} hasThumbnail={true} />;
    const sidebar = <Sidebar location="on_list" tagList={tagList} categoryList={categoryList} />;

    return (
      <Layout>
        <div className="tag-container">
          <Helmet title={`Posts tagged as "${tag}" - ${config.siteTitle}`} />
          <Header title={`Posts tagged as "${tag}"`} />
          <MainContainer content={content} sidebar={sidebar} />
        </div>
      </Layout>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
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
            category
            cover {
              childImageSharp {
                fluid(maxWidth: 660) {
                  ...GatsbyImageSharpFluid
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
