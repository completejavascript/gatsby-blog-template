import React from "react";
import AutoLink from "../AutoLink/AutoLink";
import { getTagPath } from "../../utils/helpers";
import { postConfig } from "../../../data/config";
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
          {postConfig.postTagged && <span>{postConfig.postTagged} </span>}

          {!postConfig.postTagged && (
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
