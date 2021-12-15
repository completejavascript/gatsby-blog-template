import React from "react";
import PostTags from "./PostTags";
import PostShare2 from "./PostShare2";
import PostDate from "./PostDate";
import PostDivider from "./PostDivider";
import PostSibling from "./PostSibling";
import PostDirectory from "./PostDirectory";
import PostFollow from "./PostFollow";
import AdSense from "react-adsense";
import GithubComment from "../Comment/GithubComment";
import useWindowSize from "../../hooks/useWindowSize";
import { postConfig, adsConfig } from "../../../data/config";
import "./Post.scss";
import "../../../content/styles/code-highlight.scss";

const Post = ({ postNode, slug, nextTitle, nextSlug, prevTitle, prevSlug }) => {
  const post = postNode.frontmatter;
  if (!post.id) {
    post.id = slug;
  }
  if (!post.category_id) {
    post.category_id = postConfig.postDefaultCategoryID;
  }

  const size = useWindowSize();

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

      {size?.width < 1000 &&
        adsConfig.hasAdsense &&
        adsConfig.adsenseUnits.postTop && (
          <AdSense.Google {...adsConfig.adsenseUnits.postTop} />
        )}

      {size?.width >= 1000 &&
        size?.width < 1200 &&
        adsConfig.hasAdsense &&
        adsConfig.adsenseUnits.postTopSmall && (
          <AdSense.Google {...adsConfig.adsenseUnits.postTopSmall} />
        )}

      {size?.width >= 1200 &&
        adsConfig.hasAdsense &&
        adsConfig.adsenseUnits.postTopSmall2 && (
          <AdSense.Google {...adsConfig.adsenseUnits.postTopSmall2} />
        )}

      <div
        className="padding-top padding-bottom"
        dangerouslySetInnerHTML={{ __html: postNode.html }}
      />

      {adsConfig.hasAdsense && adsConfig.adsenseUnits?.postBottom && (
        <AdSense.Google {...adsConfig.adsenseUnits?.postBottom} />
      )}

      <PostDivider />
      <PostFollow />

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
        <span className="text-description">{postConfig.txtShare}</span>
        <PostShare2
          postPath={slug}
          postNode={postNode}
          extraClass="margin-left-half"
        />
      </div>
      <PostDivider />

      {adsConfig.hasAdsense && adsConfig.adsenseUnits?.matchedPostBottom && (
        <AdSense.Google {...adsConfig.adsenseUnits?.matchedPostBottom} />
      )}

      {process.env.NODE_ENV === "production" && <GithubComment />}
    </div>
  );
};

export default Post;
