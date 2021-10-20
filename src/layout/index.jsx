import React from "react";
import Helmet from "react-helmet";
import Navigation from "../components/Navigation/Navigation";
import Footer2 from "../components/Footer2/Footer2";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import siteConfig from "../../data/SiteConfig";
import brand from "../../content/images/brand.png";
import "shiba-css/docs/css/shiba.min.css";
import "../../content/styles/customize.scss";
import "../fonts/font.css";

const MainLayout = ({
  children,
  hasFooter = true,
  hideOnScroll = true,
  adaptiveBoxShadow = false,
}) => (
  <div>
    <Helmet htmlAttributes={{ lang: siteConfig.siteLang }}>
      <meta name="description" content={siteConfig.siteDescription} />
      <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="canonical" href={siteConfig.siteUrl} />
    </Helmet>
    <Navigation
      brand={brand}
      title={siteConfig.navTitle}
      links={siteConfig.navLinks}
      hideOnScroll={hideOnScroll}
      adaptiveBoxShadow={adaptiveBoxShadow}
    />
    {children}
    {hasFooter && <Footer2 />}
    <ScrollToTop color="white" bgColor="grey-half" />
  </div>
);

export default MainLayout;
