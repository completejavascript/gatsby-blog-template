import React from "react";
import AutoLink from "../AutoLink/AutoLink";
import { FontAwesomeIcon } from "../Icons/FontAwesomeIcon";

const SocialLinks = ({ socials, color }) => (
  <div className="social-links-container margin-half">
    {socials.map((social) => {
      if (social.url !== "")
        return (
          <AutoLink
            className="margin-left-half margin-right-half"
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
);

export default SocialLinks;
