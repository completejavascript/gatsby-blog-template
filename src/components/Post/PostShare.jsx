import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  RedditShareButton,
  FacebookShareCount,
  RedditShareCount,
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  RedditIcon,
} from "react-share";
import urljoin from "url-join";
import config from "../../../data/SiteConfig";

const PostShare = ({ postNode, postPath, extraClass = "" }) => {
  const post = postNode.frontmatter;
  const url = urljoin(config.siteUrl, config.pathPrefix, postPath);
  const iconSize = 26;
  const filter = (count) => (count > 0 ? count : "");
  const renderShareCount = (count) => (
    <div className="text-center">{filter(count)}</div>
  );

  return (
    <div className={`flex ${extraClass}`}>
      <RedditShareButton
        className="cursor-pointer margin-right-half"
        url={url}
        title={post.title}
      >
        <RedditIcon round size={iconSize} />
        <RedditShareCount url={url}>
          {(count) => renderShareCount(count)}
        </RedditShareCount>
      </RedditShareButton>

      <TwitterShareButton
        className="cursor-pointer margin-right-half"
        url={url}
        title={post.title}
      >
        <TwitterIcon round size={iconSize} />
      </TwitterShareButton>

      <FacebookShareButton
        className="cursor-pointer margin-right-half"
        url={url}
        quote={postNode.excerpt}
      >
        <FacebookIcon round size={iconSize} />
        <FacebookShareCount url={url}>
          {(count) => renderShareCount(count)}
        </FacebookShareCount>
      </FacebookShareButton>

      <TelegramShareButton className="cursor-pointer" url={url}>
        <TelegramIcon round size={iconSize} />
      </TelegramShareButton>
    </div>
  );
};

export default PostShare;
