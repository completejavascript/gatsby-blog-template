import React from "react";
import { formatDate } from "../../utils/helpers";

const PostDate = ({ date, extraClass = "" }) => (
  <div className={`text-description ${extraClass}`}>
    Posted on {formatDate(date)}
  </div>
)

export default PostDate;