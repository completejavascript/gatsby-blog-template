import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";

import Navigation from "../components/Navigation/Navigation";
import Footer from "../components/Footer/Footer";
import SEO from "../components/SEO/SEO";
import MacWindow from "../components/MacWindow/MacWindow";
import AutoLink from "../components/AutoLink/AutoLink";
import Thumbnail from "../components/PostListing/Thumbnail";
import AskAnswerAnimation from "../components/MacWindow/AskAnswerAnimation";
import TipTrickWindow from "../components/MacWindow/TipTrickWindow";
import "../components/Icons/FontAwesome";

import { getPostList, getTagPath } from "../utils/helpers";
import config from "../../data/SiteConfig";
import brand from "../../content/images/brand.png";
import "shiba-css/docs/css/shiba.min.css";
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
    <div className="container padding">
      <div className="left col-xs-12 col-lg-6">
        <h1 className="txt-welcome color-black">
          Welcome to
          <br />
          <span className="txt-highlight color-blue">{config.siteTitle}</span>
        </h1>
        <p>
          Chia sẻ về JavaScript, lập trình JavaScript từ cơ bản đến nâng cao.
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
      <div className="right col-xs-12 col-lg-6">
        <MacWindow dark>
          <TipTrickWindow />
        </MacWindow>
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
    <div className="container padding margin-top-3 margin-bottom-3">
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

const CommunitySection = () => (
  <section className="community-section background-color-light-blue">
    <div className="container padding">
      <div className="left col-xs-12 col-lg-6">
        <MacWindow>
          <AskAnswerAnimation />
        </MacWindow>
      </div>
      <div className="right color-white col-xs-12 col-lg-6">
        <h3>
          <b className="color-dark-grey">👨🏻‍💻👩🏻‍💻</b> Hỏi đáp JavaScript VN
        </h3>
        <blockquote>
          The best way to learn is to ask.
          <cite>- Anonymous</cite>
        </blockquote>
        <p>
          Tham gia ngay để học JavaScript và tiến bộ mỗi ngày cùng với hơn{" "}
          <b>10K lập trình viên!</b>
        </p>
        <div>
          <AutoLink className="color-yellow" to={config.jsGroupUrl}>
            ⚡ Cộng đồng JavaScript 🚀
          </AutoLink>
        </div>
      </div>
    </div>
  </section>
);

const ServiceSection = () => {
  const serviceList = [
    {
      title: "Landing Page",
      description:
        "Phát triển các Landing Page về bản thân - portfolio, giới thiệu công ty, quảng bá sản phẩm...",
    },
    {
      title: "ReactJS",
      description:
        "Các ứng dụng web dùng ReactJS với các React Component tự viết theo yêu cầu hoặc thư viện Ant Design, Material-UI.",
    },
    {
      title: "GatsbyJS",
      description:
        "Xây dựng blog, website công ty, thương mại điện tử,... với sự hỗ trợ của rất nhiều theme, plugin và deploy đơn giản.",
    },
    {
      title: "Ứng dụng desktop Qt/QML",
      description:
        "Xây dựng các ứng dụng Desktop hiệu năng cao, đa nền tảng trên Windows, macOS và Linux.",
    },
    {
      title: "Thư viện đa nền tảng Qt/C++",
      description:
        "Thư viện cross-platform dễ dàng sử dụng trên Windows, macOS, Linux, Android (jni/Kotlin) và iOS (Swift/Objective-C).",
    },
    {
      title: "Android Application",
      description:
        "Phát triển ứng dụng Android trên điện thoại thông minh sử dụng Kotlin/Java hoặc React Native.",
    },
  ];

  return (
    <section className="service-section background-color-white">
      <div className="container margin-top-3 margin-bottom-3 padding">
        <div className="text-center padding-bottom-3 padding-top-3">
          <h2 className="section-title margin-bottom-1">Dịch vụ</h2>
          <p className="section-subtitle margin-top-half">
            Ngoài công việc full-time và viết blog ra thì mình còn làm{" "}
            <b>freelancer</b>.
          </p>
        </div>
        <div className="service-container">
          {serviceList.map((service) => (
            <div className="service-item" key={service.title}>
              <h5 className="text-center color-blue">{service.title}</h5>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
        <p className="text-center margin-top-3">
          🤝 Nếu có công việc phù hợp muốn hợp tác, bạn có thể liên hệ trực tiếp
          với mình qua{" "}
          <b>
            <a
              href={`mailto:${config.serviceEmail}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Email
            </a>
          </b>{" "}
          hoặc hợp tác với mình trên{" "}
          <b>
            <a
              href={config.freeLancerLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Upwork
            </a>
          </b>{" "}
          nhé! 🏆
        </p>
      </div>
    </section>
  );
};

function Index({ data }) {
  const postEdges = data?.allMarkdownRemark?.edges || [];
  const postList = getPostList(postEdges);

  return (
    <IndexLayout>
      <main className="index-container background-color-white">
        <WelcomeSection />
        <LatestPostsSection postList={postList} />
        <CommunitySection />
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
