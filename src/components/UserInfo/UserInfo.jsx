import React from "react";
import { Follow } from "react-twitter-widgets";

const UserInfo = ({ config, expanded }) => {
  const { userTwitter } = config;

  return (
    <div className={`user-info-container`}>
      <Follow
        username={userTwitter}
        options={{ count: expanded ? true : "none" }}
      />
    </div>
  )
}

export default UserInfo;
