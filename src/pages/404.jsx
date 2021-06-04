import React from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import Header from "../components/Header/Header";
import SEO from "../components/SEO/SEO";
import AutoLink from "../components/AutoLink/AutoLink";
import config from "../../data/SiteConfig";

const PageNotFound = () => (
  <Layout hasFooter={false}>
    <div className="page-not-found-container">
      <Helmet title={`${config.pageNotFoundTitle} - ${config.siteTitle}`} />
      <SEO />
      <Header title={`${config.pageNotFoundTitle}`} />
      <div className="main-content container padding-top-3 padding-bottom-3 margin-top-3 margin-bottom-3">
        <p>{config.pageNotFoundContent}</p>
        <AutoLink to="/" className="btn btn-primary">
          {config.pageNotFoundBtn}
        </AutoLink>
      </div>
    </div>
  </Layout>
);

export default PageNotFound;
