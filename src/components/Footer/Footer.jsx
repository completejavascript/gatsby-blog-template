import React from "react";
import SocialLinks from "./SocialLinks";
import FooterLinks from "./FooterLinks";
import Copyright from "./Copyright";
import "./Footer.css";

const Footer = ({ socials, links, copyright }) => (
  <footer 
    className="footer-container background-color-dark-grey color-white 
      text-center padding-top padding-bottom-half"
  >
    <SocialLinks socials={socials} />
    <FooterLinks links={links} />
    <Copyright copyright={copyright} />
  </footer>
)

export default Footer;
