import React, { Component } from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import Contact from "../components/Contact/Contact";
import config from "../../data/SiteConfig";

class ContactPage extends Component {
  render() {
    return (
      <Layout>
        <div className="contact-container">
          <Helmet title={`Contact | ${config.siteTitle}`} />
          <Contact />
        </div>
      </Layout>
    );
  }
}

export default ContactPage;
