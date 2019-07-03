import React from "react";
import Helmet from "react-helmet";
import Navigation from "../components/Navigation/Navigation";
import siteConfig from "../../data/SiteConfig";
import navConfig from "../../data/navigation/navConfig";
import brand from "../../data/navigation/brand.png";
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
          title={navConfig.title} 
          links={navConfig.links} 
        />
        {children}
      </div>
    );
  }
}
