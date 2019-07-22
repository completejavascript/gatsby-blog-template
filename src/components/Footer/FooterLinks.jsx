import React from "react";
import AutoLink from "../AutoLink/AutoLink";

const FooterLinks = ({ links }) => (
  <div className="footer-links-container margin-half">
    {links.map(link => (
        <AutoLink
          key={link.label}
          to={link.url}
          className="item margin-left-half margin-right-half color-white inline-block"
        >
          {link.label}
        </AutoLink>
      ))}
  </div>
)

export default FooterLinks;