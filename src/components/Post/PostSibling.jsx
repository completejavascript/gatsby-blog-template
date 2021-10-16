import React from "react";
import AutoLink from "../AutoLink/AutoLink";
import { FontAwesomeIcon } from "../Icons/FontAwesomeIcon";

function PostSibling({ nextTitle, nextSlug, prevTitle, prevSlug }) {
  return (
    <div className="post-sibling-container padding-top padding-bottom">
      {nextSlug && nextTitle && (
        <div className={`post-sibling-item left`}>
          <FontAwesomeIcon className="icon-angle-double-left" />
          <AutoLink to={nextSlug}>{nextTitle}</AutoLink>
        </div>
      )}

      {prevSlug && prevTitle && (
        <div className={`post-sibling-item right`}>
          <AutoLink to={prevSlug}>{prevTitle}</AutoLink>
          <FontAwesomeIcon className="icon-angle-double-right" />
        </div>
      )}
    </div>
  );
}

export default PostSibling;
