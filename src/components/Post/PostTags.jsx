import React from "react";
import AutoLink from "../AutoLink/AutoLink";
import { getTagPath } from "../../utils/helpers";
import config from "../../../data/SiteConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PostTags = ({ tags, extraClass = "", iconColor = "#444"}) => {
  const tagLink = tag => (
    <AutoLink 
      className="text-uppercase" 
      to={getTagPath(tag)} 
      label={tag} 
    >
      {tag}
    </AutoLink>
  )

  return (
    <>
      {tags && (
        <div className={`post-tags-container ${extraClass}`}>
          <b>
            {config.postTagged && (
              <span>{config.postTagged} </span>
            )}

            {!config.postTagged && (
              <>
                <FontAwesomeIcon icon={["fas", "tags"]} style={{ color: iconColor, width: "20px" }} />
                {" "}
              </>
            )}

            {
              tags.map((tag, index) => (
                <span key={tag}>
                  {tagLink(tag)}
                  {index < tags.length - 1 && <>, </>}
                </span>
              ))
            }
          </b>
        </div>
      )}
    </>
  )
}

export default PostTags;