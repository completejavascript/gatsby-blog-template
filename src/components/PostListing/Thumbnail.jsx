import React from "react";
import Img from "gatsby-image";
import AutoLink from "../AutoLink/AutoLink";

const Thumbnail = ({ post, extraClass = "" }) => {
  const img = post.cover ? post.cover.childImageSharp.fluid : null;
  const thumbnail = img ? (
      <AutoLink 
        to={post.slug} 
        key={post.title} 
        className={`thumbnail-wrapper line-height-reset ${extraClass}`}
      >
        <Img fluid={img} className="thumbnail-img margin-right-2" />
      </AutoLink> 
    ) : null;
  
  return thumbnail;
}

export default Thumbnail;