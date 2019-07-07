import React from "react";
import Helmet from "react-helmet";
import Navigation from "../components/Navigation/Navigation";
import Footer from "../components/Footer/Footer";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import siteConfig from "../../data/SiteConfig";
import brand from "../../content/images/brand.png";
import favicon from "../../content/images/favicon.png";
import "../components/Icons/FontAwesome";
import "../styles/shiba.min.css";

const MainLayout = ({ children }) => (
  <div>
    <Helmet 
      htmlAttributes={{ lang: siteConfig.siteLang }}
      link={[
        { rel: "shortcut icon", type: "image/x-icon", href: `${favicon}` },
      ]}
    >
      <meta name="description" content={siteConfig.siteDescription} />
    </Helmet>
    <Navigation 
      brand={brand}
      title={siteConfig.navTitle} 
      links={siteConfig.navLinks} 
    />
    {children}
    <Footer 
      socials={siteConfig.socialLinks}
      links={siteConfig.footerLinks}
      copyright={siteConfig.copyright}
    />
    <ScrollToTop 
      color="#FFF"
      bgColor="grey-half"
    />
  </div>
)

export default MainLayout;
