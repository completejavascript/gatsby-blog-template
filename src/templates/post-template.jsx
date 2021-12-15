import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import Header from "../components/Header/Header";
import MainContainer from "../components/MainContainer/MainContainer";
import { SidebarLeft, SidebarRight } from "../components/Sidebar/Sidebar";
import Post from "../components/Post/Post";
import SEO from "../components/SEO/SEO";
import BreadCrumb from "../components/Breadcrumb/Breadcrumb";
import config from "../../data/SiteConfig";
import { getDirectoryPath, useSlash } from "../utils/helpers";
import useWindowSize from "../hooks/useWindowSize";

const PostTemplate = ({ data, pageContext }) => {
  const {
    slug,
    latestEdgesTitle,
    latestEdges = [],
    nextTitle,
    nextSlug,
    prevTitle,
    prevSlug,
  } = pageContext;

  const postNode = data.markdownRemark;

  // Get posts in the same series
  const sameSeriesPosts = data.sameSeries?.edges || [];

  const title = postNode?.frontmatter?.title;
  const canonical = `${config.siteUrl}${slug}`;
  const breadcrumb = [
    {
      title: "Trang chủ",
      link: "/",
    },
    {
      title: postNode?.frontmatter?.directory,
      link: getDirectoryPath(postNode?.frontmatter?.directory),
    },
    {
      title: postNode?.frontmatter?.title,
    },
  ];

  const content = (
    <>
      <BreadCrumb items={breadcrumb} />
      <Header title={title} />
      <Post
        postNode={postNode}
        config={config}
        slug={slug}
        nextTitle={nextTitle}
        nextSlug={nextSlug}
        prevTitle={prevTitle}
        prevSlug={prevSlug}
      />
    </>
  );

  const size = useWindowSize();

  const sidebarLeft = (
    <SidebarLeft
      postSlug={slug}
      sameSeriesPosts={size?.width >= 1440 ? sameSeriesPosts : []}
    />
  );

  const sidebarRight = (
    <SidebarRight
      latestEdges={latestEdges}
      latestEdgesTitle={latestEdgesTitle}
      sameSeriesPosts={size?.width < 1440 ? sameSeriesPosts : []}
      postSlug={slug}
    />
  );

  return (
    <Layout>
      <Helmet title={`${title} - ${config.siteTitle}`}>
        <link rel="canonical" href={useSlash(canonical)} />
      </Helmet>
      <SEO postPath={slug} postNode={postNode} postSEO />
      <MainContainer
        content={content}
        sidebarLeft={sidebarLeft}
        sidebarRight={sidebarRight}
      />
    </Layout>
  );
};

export default PostTemplate;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!, $series: String) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        directory
        title
        date
        tags
        description
        keywords
        cover {
          childImageSharp {
            gatsbyImageData(width: 660, quality: 100, layout: FIXED)
          }
        }
        update
      }
      fields {
        slug
        date
      }
    }
    sameSeries: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: ASC }
      filter: { frontmatter: { series: { eq: $series } } }
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
            shortTitle
            tags
            cover {
              childImageSharp {
                gatsbyImageData(width: 660, quality: 100, layout: CONSTRAINED)
              }
            }
            date
            update
            series
          }
        }
      }
    }
  }
`;
