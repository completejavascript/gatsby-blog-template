import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";

import Navigation from "../components/Navigation/Navigation";
import Footer from "../components/Footer/Footer";
import SEO from "../components/SEO/SEO";
import BrowserAnimation from "../components/BrowserAnimation/BrowserAnimation";
import AutoLink from "../components/AutoLink/AutoLink";
import Thumbnail from "../components/PostListing/Thumbnail";

import { getPostList, getTagPath } from "../utils/helpers";
import config from "../../data/SiteConfig";
import brand from "../../content/images/brand.png";
import "./index.scss";

const IndexLayout = ({ children }) => (
  <>
    <Helmet htmlAttributes={{ lang: config.siteLang }} title={config.siteTitle}>
      <meta name="description" content={config.siteDescription} />
      <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
    </Helmet>
    <SEO />
    <Navigation
      brand={brand}
      title={config.navTitle}
      links={config.navLinks}
      hideOnScroll
    />
    {children}
    <Footer
      socials={config.socialLinks}
      links={config.footerLinks}
      copyright={config.copyright}
    />
  </>
);

const WelcomeSection = () => (
  <section className="welcome-section background-color-white">
    <div className="container">
      <div className="left">
        <h1 className="txt-welcome color-black">
          Welcome to
          <br />
          <span className="txt-highlight color-blue">{config.siteTitle}</span>
        </h1>
        <p>
          Chia sẻ về JavaScript, lập trình JavaScript từ cơ bản đến nâng cao
        </p>
        <div className="btn-group">
          <AutoLink className="btn btn-primary" to={config.blogPageUrl}>
            Đọc blog
          </AutoLink>
          <AutoLink className="btn btn-primary-inverse" to={config.jsGroupUrl}>
            Cộng đồng JavaScript
          </AutoLink>
        </div>
      </div>
      <div className="right">
        <BrowserAnimation />
      </div>
    </div>
  </section>
);

const PostArticle = ({ post }) => (
  <article>
    <Thumbnail post={post} />
    <h3>
      <AutoLink to={post.slug} key={post.title}>
        {post.title}
      </AutoLink>
    </h3>
    <div className="tag-container">
      {post.tags?.map((tag, index) => (
        <React.Fragment key={tag}>
          {index <= 2 ? (
            <span>
              <AutoLink to={getTagPath(tag)} label={tag}>
                <small>{tag}</small>
              </AutoLink>
              {index < post.tags.length - 1 && (
                <span className="color-grey"> | </span>
              )}
            </span>
          ) : null}
        </React.Fragment>
      ))}
    </div>
  </article>
);

const LatestPostsSection = ({ postList = [] }) => (
  <section className="latestposts-section">
    <div className="container margin-top-3 margin-bottom-3">
      <div className="text-center margin-bottom-3 margin-top-2">
        <h2 className="section-title">Bài viết mới nhất</h2>
      </div>
      <div className="latestposts-container">
        {postList.map((post) => (
          <PostArticle post={post} key={post.title} />
        ))}
      </div>
      <div className="text-center margin-top-3 margin-bottom-2">
        <AutoLink className="btn btn-primary" to={config.blogPageUrl}>
          Xem thêm
        </AutoLink>
      </div>
    </div>
  </section>
);

const ServiceSection = () => (
  <section className="service-section background-color-white">
    <div className="container"></div>
  </section>
);

function Index({ data }) {
  const postEdges = data?.allMarkdownRemark?.edges || [];
  const postList = getPostList(postEdges);

  return (
    <IndexLayout>
      <main className="index-container background-color-white">
        <WelcomeSection />
        <LatestPostsSection postList={postList} />
        <ServiceSection />
      </main>
    </IndexLayout>
  );
}

export default Index;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      limit: 6
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
