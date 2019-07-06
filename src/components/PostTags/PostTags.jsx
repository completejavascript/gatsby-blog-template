import React, { Component } from "react";
import _ from "lodash";
import AutoLink from "../AutoLink/AutoLink";

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
              to={`/tags/${_.kebabCase(tag)}`}
            >
              <button>{tag}</button>
            </AutoLink>
          ))}
      </div>
    );
  }
}

export default PostTags;
