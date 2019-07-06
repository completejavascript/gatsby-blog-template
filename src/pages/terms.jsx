import React, { Component } from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import Terms from "../components/Terms/Terms";
import config from "../../data/SiteConfig";

class TermsPage extends Component {
  render() {
    return (
      <Layout>
        <div className="terms-page-container">
          <Helmet title={`Terms of Usage | ${config.siteTitle}`} />
          <Terms />
        </div>
      </Layout>
    );
  }
}

export default TermsPage;
