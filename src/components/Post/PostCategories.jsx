import React from "react";
import AutoLink from "../AutoLink/AutoLink";
import { getCategoryPath } from "../../utils/helpers";
import { postConfig } from "../../../data/config";
import { FontAwesomeIcon } from "../Icons/FontAwesomeIcon";

const PostCategories = ({
  categories,
  extraClass = "",
  iconColor = "#444",
}) => {
  const categoryLink = (category) => (
    <AutoLink to={getCategoryPath(category)} label={category}>
      {category}
    </AutoLink>
  );

  return (
    <>
      {categories && (
        <div className={`post-categories-container ${extraClass}`}>
          {postConfig.postInCategories && (
            <span>{postConfig.postInCategories} </span>
          )}

          {!postConfig.postInCategories && (
            <>
              <FontAwesomeIcon
                className="icon-folder-open"
                style={{ color: iconColor, width: "20px" }}
              />{" "}
            </>
          )}

          {categories.map((category, index) => (
            <span key={category}>
              {categoryLink(category)}
              {index < categories.length - 1 && <>, </>}
            </span>
          ))}
        </div>
      )}
    </>
  );
};

export default PostCategories;
