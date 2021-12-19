import React from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";

import MacWindow from "../components/MacWindow/MacWindow";
import AutoLink from "../components/AutoLink/AutoLink";
import Thumbnail from "../components/PostListing/Thumbnail";
import AskAnswerAnimation from "../components/MacWindow/AskAnswerAnimation";
import MainLayout from "../layout/index";

import { getPostList, getTagPath, useSlash } from "../utils/helpers";
import { siteConfig, pathPrefixConfig, sidebarConfig } from "../../data/config";
import welcomeSectionImage from "../../content/images/illustration-pair-programming.svg";

import "./index.scss";

const WelcomeSection = () => (
  <section className="welcome-section background-color-white">
    <div className="container padding">
      <div className="left col-xs-12 col-lg-6">
        <h1 className="row txt-welcome color-black">
          Welcome to <br />
          <span className="txt-highlight color-blue">
            {siteConfig.siteTitle}
          </span>
        </h1>
        <p className="row">
          Chia sẻ về JavaScript, lập trình JavaScript từ cơ bản đến nâng cao.
        </p>
        <div className="row btn-group">
          <AutoLink
            className="btn btn-primary"
            to={pathPrefixConfig.javascript}
          >
            JavaScript
          </AutoLink>
          <AutoLink
            className="btn btn-primary-inverse"
            to={pathPrefixConfig.react}
          >
            React
          </AutoLink>
        </div>
      </div>
      <div className="right col-xs-12 col-lg-6 text-center">
        <AutoLink to={pathPrefixConfig.service}>
          <img src={welcomeSectionImage} alt="" className="illustration" />
        </AutoLink>
        <p className="text-description">Learning together, growing together</p>
      </div>
    </div>
  </section>
);

const PostArticle1 = ({ post }) => (
  <article className="post-article-1">
    <Thumbnail post={post} />
    <h3>
      <AutoLink to={post.slug} key={post.title}>
        {post.title}
      </AutoLink>
    </h3>
    <div className="tag-container">
      {post.tags?.map((tag, index) => (
        <React.Fragment key={tag}>
          {index <= 3 ? (
            <span>
              <AutoLink to={getTagPath(tag)} label={tag}>
                <small>{tag}</small>
              </AutoLink>
              {index < post.tags.length - 1 && index < 3 && (
                <span className="color-light-grey"> | </span>
              )}
            </span>
          ) : null}
        </React.Fragment>
      ))}
    </div>
  </article>
);

const PostArticle2 = ({ post }) => (
  <article className="post-article-2">
    <h3>
      <AutoLink to={post.slug} key={post.title}>
        {post.title}
      </AutoLink>
    </h3>
    <div className="tag-container">
      {post.tags?.map((tag, index) => (
        <React.Fragment key={tag}>
          {index <= 3 ? (
            <span>
              <AutoLink to={getTagPath(tag)} label={tag}>
                <small>{tag}</small>
              </AutoLink>
              {index < post.tags.length - 1 && index < 3 && (
                <span className="color-light-grey"> | </span>
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
    <div className="container padding margin-top-3 margin-bottom-3">
      <div className="text-center margin-bottom-3 margin-top-2">
        <h2 className="section-title">{sidebarConfig.latestPostsTitle}</h2>
      </div>
      <div className="latestposts-container">
        {postList.map((post) => (
          <PostArticle1 post={post} key={post.title} />
        ))}
      </div>
      <div className="text-center margin-top-3 margin-bottom-2">
        <AutoLink className="btn btn-primary" to={pathPrefixConfig.blog}>
          Xem thêm
        </AutoLink>
      </div>
    </div>
  </section>
);

const LatestFreebiesSection = ({ postList = [] }) => (
  <section className="latestfreebies-section">
    <div className="container padding margin-top-3 margin-bottom-3">
      <div className="text-center margin-bottom-3 margin-top-2">
        <h2 className="section-title">{sidebarConfig.latestFreebieTitle}</h2>
      </div>
      <div className="latestposts-container">
        {postList.map((post) => (
          <PostArticle1 post={post} key={post.title} />
        ))}
      </div>
      <div className="text-center margin-top-3 margin-bottom-2">
        <AutoLink className="btn btn-primary" to={pathPrefixConfig.freebie}>
          Xem thêm
        </AutoLink>
      </div>
    </div>
  </section>
);

const LatestQuestionSection = ({ postList = [] }) => (
  <section className="latestquestion-section">
    <div className="container padding margin-top-3 margin-bottom-3">
      <div className="text-center margin-bottom-3 margin-top-2">
        <h2 className="section-title">{sidebarConfig.latestQuestionTitle}</h2>
      </div>
      <div className="latestquestions-container">
        {postList.map((post) => (
          <PostArticle2 post={post} key={post.title} />
        ))}
      </div>
      <div className="text-center margin-top-3 margin-bottom-2">
        <AutoLink
          className="btn btn-primary-inverse"
          to={pathPrefixConfig.question}
        >
          Xem thêm
        </AutoLink>
      </div>
    </div>
  </section>
);

const CommunitySection = () => (
  <section className="community-section background-color-light-blue">
    <div className="container padding">
      <div className="left col-xs-12 col-lg-6">
        <MacWindow>
          <AskAnswerAnimation />
        </MacWindow>
      </div>
      <div className="right color-white col-xs-12 col-lg-6">
        <h3 className="row">👨🏻‍💻👩🏻‍💻 Hỏi đáp JavaScript VN</h3>
        <blockquote className="row">
          The best way to learn is to ask.
          <cite>- Anonymous</cite>
        </blockquote>
        <p className="row">
          Tham gia ngay để học JavaScript và tiến bộ mỗi ngày cùng với hơn{" "}
          <b>15K lập trình viên!</b>
        </p>
        <div className="row">
          <AutoLink className="color-yellow" to={siteConfig.jsGroupUrl}>
            ⚡ Tham gia cộng đồng JavaScript 🚀
          </AutoLink>
        </div>
      </div>
    </div>
  </section>
);

function Index({ data }) {
  const postEdges = data?.posts?.edges || [];
  const freebieEdges = data?.freebies?.edges || [];
  const questionEdges = data?.questions?.edges || [];

  const postList = getPostList(postEdges);
  const freebieList = getPostList(freebieEdges);
  const questionList = getPostList(questionEdges);

  return (
    <MainLayout hasFooter={true} hideOnScroll={true} adaptiveBoxShadow={true}>
      <Helmet title={siteConfig.siteTitle}>
        <link rel="canonical" href={useSlash(siteConfig.siteUrl)} />
      </Helmet>
      <main className="index-container background-color-white">
        <WelcomeSection />
        <LatestPostsSection postList={postList} />
        <LatestFreebiesSection postList={freebieList} />
        <LatestQuestionSection postList={questionList} />
        <CommunitySection />
      </main>
    </MainLayout>
  );
}

export default Index;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query IndexQuery {
    posts: allMarkdownRemark(
      limit: 6
      sort: { fields: [frontmatter___update], order: DESC }
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
            template
            title
            tags
            date
            update
            cover {
              childImageSharp {
                gatsbyImageData(width: 660, quality: 100, layout: CONSTRAINED)
              }
            }
          }
        }
      }
    }
    freebies: allMarkdownRemark(
      limit: 6
      sort: { fields: [frontmatter___update], order: DESC }
      filter: { frontmatter: { template: { eq: "freebie" } } }
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
            template
            title
            tags
            date
            update
            cover {
              childImageSharp {
                gatsbyImageData(width: 660, quality: 100, layout: CONSTRAINED)
              }
            }
          }
        }
      }
    }
    questions: allMarkdownRemark(
      limit: 8
      sort: { fields: [frontmatter___update], order: DESC }
      filter: { frontmatter: { template: { eq: "question" } } }
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
            template
            title
            tags
            date
            update
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
