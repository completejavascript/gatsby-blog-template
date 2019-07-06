import React from "react";
import { Link } from "gatsby";

const FooterLinks = ({ links }) => (
  <div className="footer-links-container margin-half">
    {links.map(link => (
        <Link
          key={link.label}
          to={link.link}
          className="item margin-left-half margin-right-half color-white"
        >
          {link.label}
        </Link>
      ))}
  </div>
)

export default FooterLinks;