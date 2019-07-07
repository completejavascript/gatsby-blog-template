import React from "react";
import Img from "gatsby-image";
import AutoLink from "../AutoLink/AutoLink";

const Thumbnail = ({ post, extraClass }) => {
  const imgFixed = post.cover ? post.cover.childImageSharp.fixed : null;
  const thumbnail = imgFixed ? (
      <AutoLink 
        to={post.slug} 
        key={post.title} 
        className={`line-height-reset ${extraClass}`}
      >
        <Img fixed={imgFixed} className="margin-right-2" />
      </AutoLink> 
    ) : null;
  
  return thumbnail;
}

export default Thumbnail;