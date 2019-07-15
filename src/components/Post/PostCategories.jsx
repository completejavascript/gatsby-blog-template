import React from "react";
import AutoLink from "../AutoLink/AutoLink";
import { getCategoryPath } from "../../utils/helpers";
import config from "../../../data/SiteConfig";

const PostCategories = ({ categories, extraClass = "" }) => {
  const categoryLink = category => (
    <AutoLink 
      className="text-uppercase" 
      to={getCategoryPath(category)} 
      label={category} 
    >
      {category}
    </AutoLink>
  )

  return (
    <>
      {categories && (
        <div className={`post-categories-container ${extraClass}`}>
          <b>
            <span>{config.postInCategories} </span>
            {
              categories.map((category, index) => (
                <span key={category}>
                  {categoryLink(category)}
                  {index < categories.length - 1 && <>, </>}
                </span>
              ))
            }
          </b>
        </div>
      )}
    </>
  )
}

export default PostCategories;