import React from "react";
import PostTags from "./PostTags";
import PostShare from "./PostShare";
import PostShare2 from "./PostShare2";
import PostDate from "./PostDate";
import PostDivider from "./PostDivider";
import PostSibling from "./PostSibling";
import PostDirectory from "./PostDirectory";
import PostFollow from "./PostFollow";
import AdSense from "react-adsense";
import GithubComment from "../Comment/GithubComment";
import { txtShare } from "../../../data/SiteConfig";
import "./Post.scss";
import "../../../content/styles/code-highlight.scss";

const Post = ({
  postNode,
  config,
  slug,
  nextTitle,
  nextSlug,
  prevTitle,
  prevSlug,
}) => {
  const post = postNode.frontmatter;
  if (!post.id) {
    post.id = slug;
  }
  if (!post.category_id) {
    post.category_id = config.postDefaultCategoryID;
  }

  return (
    <div className="post-container">
      <div className="meta-share-wrapper padding-top">
        <PostDate extraClass="meta-wrapper" date={post.update || post.date} />
        <PostShare2
          extraClass="share-wrapper"
          postPath={slug}
          postNode={postNode}
          round={true}
          iconSize={26}
        />
      </div>

      <PostDivider />
      {config.hasAdsense && config.adsenseUnits?.postTop && (
        <AdSense.Google {...config.adsenseUnits?.postTop} />
      )}

      <div
        className="padding-top padding-bottom"
        dangerouslySetInnerHTML={{ __html: postNode.html }}
      />

      <PostDivider />
      <PostFollow />

      {config.hasAdsense && config.adsenseUnits?.postBottom && (
        <AdSense.Google {...config.adsenseUnits?.postBottom} />
      )}
      <PostDivider />

      {(!!post.directory || post.tags?.length > 0) && (
        <>
          <div className="padding-top padding-bottom">
            <PostDirectory
              directory={post.directory}
              extraClass="block"
              iconColor="#595959"
            />
            <PostTags
              tags={post.tags}
              extraClass="block padding-top-half"
              iconColor="#595959"
            />
          </div>
          <PostDivider />
        </>
      )}

      {nextTitle && nextSlug && prevTitle && prevSlug && nextSlug !== prevSlug && (
        <>
          <PostSibling
            nextTitle={nextTitle}
            nextSlug={nextSlug}
            prevTitle={prevTitle}
            prevSlug={prevSlug}
          />
          <PostDivider />
        </>
      )}

      <div className="padding-top padding-bottom flex align-items-center">
        <span className="text-description">{txtShare}</span>
        <PostShare2
          postPath={slug}
          postNode={postNode}
          extraClass="margin-left-half"
        />
      </div>
      <PostDivider />

      {config.hasAdsense && config.adsenseUnits?.matchedPostBottom && (
        <AdSense.Google {...config.adsenseUnits?.matchedPostBottom} />
      )}

      <GithubComment />
    </div>
  );
};

export default Post;
