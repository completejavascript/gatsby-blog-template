import React from "react";
import Img from "gatsby-image";

const PostFeature = ({ post }) => {
  const imgFluid = post.cover ? post.cover.childImageSharp.fluid : null;
  const featureImg = imgFluid ? <Img fluid={imgFluid} /> : null;
  return featureImg;
}

export default PostFeature;