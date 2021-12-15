import React from "react";
import { formatDate } from "../../utils/helpers";
import { postConfig } from "../../../data/config";

const PostDate = ({ date, extraClass = "" }) => (
  <div className={`text-description ${extraClass}`}>
    {postConfig.postOnDate} {formatDate(date)}
  </div>
);

export default PostDate;
