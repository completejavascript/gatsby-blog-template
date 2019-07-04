import React from "react";
import Helmet from "react-helmet";
import Navigation from "../components/Navigation/Navigation";
import siteConfig from "../../data/SiteConfig";
import brand from "../../static/logos/logo-48x48.png";
import "../styles/shiba.min.css";

export default class MainLayout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        <Helmet>
          <meta name="description" content={siteConfig.siteDescription} />
        </Helmet>
        <Navigation 
          brand={brand}
          title={siteConfig.navTitle} 
          links={siteConfig.navLinks} 
        />
        {children}
      </div>
    );
  }
}
