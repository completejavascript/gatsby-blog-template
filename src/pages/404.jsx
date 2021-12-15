import React from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import Header from "../components/Header/Header";
import SEO from "../components/SEO/SEO";
import AutoLink from "../components/AutoLink/AutoLink";
import MainContainerWrapper from "../components/MainContainer/MainContainerWrapper";
import { siteConfig } from "../../data/config";
import { useSlash } from "../utils/helpers";
import notFoundImage from "../../content/images/illustration-not-found.svg";

const PageNotFound = () => {
  const canonical = siteConfig.siteUrl;

  return (
    <Layout hasFooter={true}>
      <Helmet
        title={`${siteConfig.pageNotFoundTitle} - ${siteConfig.siteTitle}`}
      >
        <link rel="canonical" href={useSlash(canonical)} />
      </Helmet>
      <SEO />

      <MainContainerWrapper className="main-content container padding-bottom-3 margin-bottom-3">
        <Header title={`${siteConfig.pageNotFoundTitle}`} />

        <div className="padding-top-3 padding-bottom-2">
          <img
            src={notFoundImage}
            alt=""
            style={{ width: "300px", maxWidth: "100%", height: "auto" }}
          />
        </div>

        <p className="margin-top-3">{siteConfig.pageNotFoundContent}</p>

        <AutoLink to="/" className="btn btn-primary">
          {siteConfig.pageNotFoundBtn}
        </AutoLink>
      </MainContainerWrapper>
    </Layout>
  );
};

export default PageNotFound;
