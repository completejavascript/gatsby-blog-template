import React from "react";
import AutoLink from "../AutoLink/AutoLink";
import { getTagPath } from "../../utils/helpers";
import config from "../../../data/SiteConfig";

const PostTags = ({ tags, extraClass = "" }) => {
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
            <span>{config.postTagged} </span>
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