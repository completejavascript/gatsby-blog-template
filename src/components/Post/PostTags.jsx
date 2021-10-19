import React from "react";
import AutoLink from "../AutoLink/AutoLink";
import { getTagPath } from "../../utils/helpers";
import config from "../../../data/SiteConfig";
import { FontAwesomeIcon } from "../Icons/FontAwesomeIcon";

const tagLink = (tag) => (
  <AutoLink to={getTagPath(tag)} label={tag}>
    {tag}
  </AutoLink>
);

const PostTags = ({ tags, extraClass = "", iconColor = "#444" }) => {
  return (
    <>
      {tags && (
        <div className={`post-tags-container ${extraClass}`}>
          {config.postTagged && <span>{config.postTagged} </span>}

          {!config.postTagged && (
            <>
              <FontAwesomeIcon
                className="icon-tags"
                style={{ color: iconColor, width: "20px" }}
              />{" "}
            </>
          )}

          {tags.map((tag, index) => (
            <span key={tag}>
              {tagLink(tag)}
              {index < tags.length - 1 && <>, </>}
            </span>
          ))}
        </div>
      )}
    </>
  );
};

export default PostTags;
