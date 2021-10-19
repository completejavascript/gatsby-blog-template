import React from "react";
import AutoLink from "../AutoLink/AutoLink";
import { getDirectoryPath } from "../../utils/helpers";
import { FontAwesomeIcon } from "../Icons/FontAwesomeIcon";

const directoryLink = (directory) => (
  <AutoLink to={getDirectoryPath(directory)} label={directory}>
    {directory}
  </AutoLink>
);

const PostDirectory = ({ directory, extraClass = "", iconColor = "#444" }) => {
  return (
    <>
      {directory && (
        <div className={`post-categories-container ${extraClass}`}>
          <FontAwesomeIcon
            className="icon-folder-open"
            style={{ color: iconColor, width: "20px" }}
          />{" "}
          {directoryLink(directory)}
        </div>
      )}
    </>
  );
};

export default PostDirectory;
