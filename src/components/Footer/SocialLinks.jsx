import React from "react";
import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SocialLinks = ({ socials, color }) => (
  <div className="social-links-container margin-half">
    {
      socials.map(social => {
        if (social.link !== "") return (
          <Link 
            className="margin-left-half margin-right-half" 
            to={social.link} 
            key={social.label}
          >
            <FontAwesomeIcon 
              icon={social.iconClassName.split(" ")} 
              transform="grow-2"
              style={{ color }}
            />
          </Link>
        )
        
        // Ignore
        return null
      })
    }
  </div>
)

export default SocialLinks;
