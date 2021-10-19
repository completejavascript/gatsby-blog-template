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

const PostShare2 = ({ postNode, postPath, extraClass = "" }) => {
  const post = postNode.frontmatter;
  const url = urljoin(config.siteUrl, config.pathPrefix, postPath);
  const iconSize = 40;

  return (
    <div className={`flex ${extraClass}`}>
      <RedditShareButton
        className="cursor-pointer margin-right-half"
        url={url}
        title={post.title}
      >
        <RedditIcon size={iconSize} />
      </RedditShareButton>

      <TwitterShareButton
        className="cursor-pointer margin-right-half"
        url={url}
        title={post.title}
      >
        <TwitterIcon size={iconSize} />
      </TwitterShareButton>

      <FacebookShareButton
        className="cursor-pointer margin-right-half"
        url={url}
        quote={postNode.excerpt}
      >
        <FacebookIcon size={iconSize} />
      </FacebookShareButton>

      <LinkedinShareButton
        className="cursor-pointer margin-right-half"
        url={url}
        title={postNode.title}
        summary={postNode.excerpt}
        source={config.siteUrl}
      >
        <LinkedinIcon size={iconSize} />
      </LinkedinShareButton>

      <TelegramShareButton className="cursor-pointer" url={url}>
        <TelegramIcon size={iconSize} />
      </TelegramShareButton>
    </div>
  );
};

export default PostShare2;
