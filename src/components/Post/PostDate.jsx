import React from "react";
import { formatDate } from "../../utils/helpers";

const PostDate = ({ date }) => (
  <div className="text-description inline-block">
    <small>Posted on {formatDate(date)}</small>
  </div>
)

export default PostDate;