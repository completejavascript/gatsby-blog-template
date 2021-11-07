import React from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import Header from "../components/Header/Header";
import SEO from "../components/SEO/SEO";
import AutoLink from "../components/AutoLink/AutoLink";
import MainContainerWrapper from "../components/MainContainer/MainContainerWrapper";
import config from "../../data/SiteConfig";

const PageNotFound = () => {
  const canonical = config.siteUrl;

  return (
    <Layout hasFooter={true}>
      <Helmet title={`${config.pageNotFoundTitle} - ${config.siteTitle}`}>
        <link rel="canonical" href={canonical} />
      </Helmet>
      <SEO />

      <MainContainerWrapper className="main-content container padding-bottom-3 margin-bottom-3">
        <Header title={`${config.pageNotFoundTitle}`} />
        <p className="margin-top-3">{config.pageNotFoundContent}</p>
        <AutoLink to="/" className="btn btn-primary">
          {config.pageNotFoundBtn}
        </AutoLink>
      </MainContainerWrapper>
    </Layout>
  );
};

export default PageNotFound;
