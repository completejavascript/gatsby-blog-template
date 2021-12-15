import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  RedditShareButton,
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  RedditIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";
import urljoin from "url-join";
import { siteConfig } from "../../../data/config";

const PostShare2 = ({
  postNode,
  postPath,
  extraClass = "",
  round = false,
  iconSize = 40,
}) => {
  const post = postNode.frontmatter;
  const url = urljoin(siteConfig.siteUrl, siteConfig.pathPrefix, postPath);

  return (
    <div className={`flex ${extraClass}`}>
      <RedditShareButton
        className="cursor-pointer margin-right-half"
        url={url}
        title={post.title}
      >
        <RedditIcon round={round} size={iconSize} />
      </RedditShareButton>

      <TwitterShareButton
        className="cursor-pointer margin-right-half"
        url={url}
        title={post.title}
      >
        <TwitterIcon round={round} size={iconSize} />
      </TwitterShareButton>

      <FacebookShareButton
        className="cursor-pointer margin-right-half"
        url={url}
        quote={postNode.excerpt}
      >
        <FacebookIcon round={round} size={iconSize} />
      </FacebookShareButton>

      <LinkedinShareButton
        className="cursor-pointer margin-right-half"
        url={url}
        title={postNode.title}
        summary={postNode.excerpt}
        source={siteConfig.siteUrl}
      >
        <LinkedinIcon round={round} size={iconSize} />
      </LinkedinShareButton>

      <TelegramShareButton className="cursor-pointer" url={url}>
        <TelegramIcon round={round} size={iconSize} />
      </TelegramShareButton>
    </div>
  );
};

export default PostShare2;
