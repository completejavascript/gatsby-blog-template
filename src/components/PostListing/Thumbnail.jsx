import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import AutoLink from "../AutoLink/AutoLink";

const Thumbnail = ({ post, extraClass = "" }) => {
  const thumbnail = post.cover ? (
    <AutoLink
      to={post.slug}
      key={post.title}
      className={`thumbnail-wrapper line-height-reset ${extraClass}`}
    >
      <GatsbyImage image={getImage(post.cover)} className="thumbnail-img" alt="" />
    </AutoLink>
  ) : null;

  return thumbnail;
};

export default Thumbnail;
