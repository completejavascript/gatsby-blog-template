import React from "react";
import SocialLinks from "./SocialLinks";
import FooterLinks from "./FooterLinks";
import Copyright from "./Copyright";

const Footer = ({ socials, links, copyright }) => (
  <footer 
    className="footer-container background-color-dark-grey color-white 
      text-center padding-top padding-bottom-half"
  >
    <div className="container">
      <SocialLinks socials={socials} color="#FFF" />
      <FooterLinks links={links} />
      <Copyright copyright={copyright} />
    </div>
  </footer>
)

export default Footer;
