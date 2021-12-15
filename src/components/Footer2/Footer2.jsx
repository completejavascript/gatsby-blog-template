import React from "react";
import AutoLink from "../AutoLink/AutoLink";
import NavBrand from "../Navigation/NavBrand";
import { FontAwesomeIcon } from "../Icons/FontAwesomeIcon";
import { siteConfig, footerConfig } from "../../../data/config";
import { getCurrentYear } from "../../utils/helpers";
import brand from "../../../content/images/brand.png";
import "./Footer2.scss";

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
    <div className="container-full footer">
      <div className="footer-copyright-links container text-center padding-top-2">
        {footerConfig.footerLinks &&
          footerConfig.footerLinks.length > 0 &&
          footerConfig.footerLinks.map((link) => (
            <AutoLink
              key={link.label}
              to={link.url}
              className="item margin-left-half margin-right-half  inline-block"
            >
              {link.label}
            </AutoLink>
          ))}
      </div>

      <div className="footer-copyright container text-center">
        {`© 2017-${getCurrentYear()} `}
        <AutoLink to={siteConfig.siteUrl}>{siteConfig.siteTitle}</AutoLink>
        {`. Unless otherwise noted, all code MIT license.`}
      </div>
    </div>
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
                  className={social.iconClassName}
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
        <NavBrand brand={brand} title="" size="48px" />
      </div>

      <p className="content">
        {siteConfig.siteTitle} là trang blog về lập trình - chuyên chia sẻ kiến
        thức về lập trình <AutoLink to="/javascript">JavaScript</AutoLink>, một
        số thư viện/framework Javascript (
        <AutoLink to="/react">React.js</AutoLink>,{" "}
        <AutoLink to="/tag/gatsbyjs">Gatsby.js</AutoLink>,...) và những kiến
        thức khác liên quan đến lập trình web (
        <AutoLink to="/tag/html">HTML</AutoLink>,{" "}
        <AutoLink to="/tag/css">CSS</AutoLink>,...).
      </p>

      <FooterSocialLinks
        socials={footerConfig.socialLinks}
        color="#606060"
        header="Mạng xã hội"
      />
    </div>
  );
}

function Footer2() {
  return (
    <footer className="footer-container-2">
      <div className="container-full widgets">
        <div className="footer-widgets container">
          <FooterSiteInfo />

          <FooterLinks
            className="project-links"
            header="Dự án cá nhân"
            links={footerConfig.projectLinks}
          />

          <FooterLinks
            className="network-links"
            header="Các trang web"
            links={footerConfig.networkLinks}
          />

          <FooterLinks
            className="site-links"
            header="Tài nguyên"
            links={footerConfig.aboutLinks}
          />
        </div>
      </div>

      <FooterCopyright />
    </footer>
  );
}

export default Footer2;
