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
import config from "../../../data/SiteConfig";

const PostShare2 = ({
  postNode,
  postPath,
  extraClass = "",
  round = false,
  iconSize = 40,
}) => {
  const post = postNode.frontmatter;
  const url = urljoin(config.siteUrl, config.pathPrefix, postPath);

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
        source={config.siteUrl}
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
