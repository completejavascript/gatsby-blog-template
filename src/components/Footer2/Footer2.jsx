import React from "react";
import AutoLink from "../AutoLink/AutoLink";
import NavBrand from "../Navigation/NavBrand";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  networkLinks,
  footerLinks,
  siteTitle,
  siteUrl,
  projectLinks,
  socialLinks,
} from "../../../data/SiteConfig";
import { getCurrentYear } from "../../utils/helpers";
import "./Footer2.scss";
import brand from "../../../content/images/brand.png";

function FooterLinks({ header, links, className = "" }) {
  return (
    <div className={`footer-links ${className}`}>
      <div className="header">{header}</div>
      {links.map((item) => (
        <AutoLink to={item.url} key={item.label + item.url}>
          {item.label}
        </AutoLink>
      ))}
    </div>
  );
}

function FooterCopyright() {
  return (
    <footer className="container-full footer">
      <div className="footer-copyright container text-center">
        {`© 2017-${getCurrentYear()} `}
        <AutoLink to={siteUrl}>{siteTitle}</AutoLink>
        {`. Unless otherwise noted, all code MIT license.`}
      </div>
    </footer>
  );
}

function FooterSocialLinks({ socials, color, header }) {
  return (
    <div className="social-links-container">
      <div className="header">{header}</div>
      <div className="links">
        {socials.map((social) => {
          if (social.url !== "")
            return (
              <AutoLink
                className="margin-right"
                to={social.url}
                key={social.label}
              >
                <FontAwesomeIcon
                  icon={social.iconClassName.split(" ")}
                  style={{ color }}
                />
              </AutoLink>
            );

          // Ignore
          return null;
        })}
      </div>
    </div>
  );
}

function FooterSiteInfo() {
  return (
    <div className="site-info">
      <div className="flex">
        <NavBrand brand={brand} title="" />
      </div>

      <p className="content">
        {siteTitle} là trang blog về lập trình - chuyên chia sẻ kiến thức về lập
        trình{" "}
        <AutoLink to="/category/javascript-co-ban">JavaScript cơ bản</AutoLink>{" "}
        đến <AutoLink to="/category/thu-thuat-javascript">nâng cao</AutoLink>,
        một số thư viện/framework Javascript (
        <AutoLink to="/tag/react">React.js</AutoLink>,{" "}
        <AutoLink to="/tag/gatsbyjs">Gatsby.js</AutoLink>,...) và những kiến
        thức khác liên quan đến lập trình web (
        <AutoLink to="/tag/html">HTML</AutoLink>,{" "}
        <AutoLink to="/tag/css">CSS</AutoLink>,...).
      </p>

      <FooterSocialLinks
        socials={socialLinks}
        color="#606060"
        header="CONNECT"
      />
    </div>
  );
}

function Footer2() {
  return (
    <div className="footer-container-2">
      <div className="container-full widgets">
        <div className="footer-widgets container">
          <FooterSiteInfo />

          <FooterLinks
            className="project-links"
            header="Projects"
            links={projectLinks}
          />

          <FooterLinks
            className="network-links"
            header="Network"
            links={networkLinks}
          />

          <FooterLinks
            className="site-links"
            header="About"
            links={footerLinks}
          />
        </div>
      </div>

      <FooterCopyright />
    </div>
  );
}

export default Footer2;
