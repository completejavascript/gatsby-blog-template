import React, { Component } from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import Privacy from "../components/Privacy/Privacy";
import config from "../../data/SiteConfig";

class PrivacyPage extends Component {
  render() {
    return (
      <Layout>
        <div className="privacy-policy-container">
          <Helmet title={`Privacy Policy | ${config.siteTitle}`} />
          <Privacy />
        </div>
      </Layout>
    );
  }
}

export default PrivacyPage;
