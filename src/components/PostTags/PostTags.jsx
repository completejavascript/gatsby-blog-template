import React, { Component } from "react";
import AutoLink from "../AutoLink/AutoLink";
import { getTagPath } from "../../utils/helpers";

class PostTags extends Component {
  render() {
    const { tags } = this.props;
    return (
      <div className="post-tag-container">
        {tags &&
          tags.map(tag => (
            <AutoLink
              key={tag}
              style={{ textDecoration: "none" }}
              to={getTagPath(tag)}
            >
              <button>{tag}</button>
            </AutoLink>
          ))}
      </div>
    );
  }
}

export default PostTags;
