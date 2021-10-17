import React from "react";
import PostTags from "./PostTags";
import PostShare from "./PostShare";
import PostDate from "./PostDate";
import PostDivider from "./PostDivider";
import PostCategories from "./PostCategories";
import PostSibling from "./PostSibling";
import AdSense from "react-adsense";
import GithubComment from "../Comment/GithubComment";
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
      <div className="meta-share-wrapper padding-top padding-bottom">
        <PostDate extraClass="meta-wrapper" date={post.update || post.date} />
        <PostShare
          extraClass="share-wrapper"
          postPath={slug}
          postNode={postNode}
        />
      </div>

      <PostDivider />
      {config.hasAdsense && config.adsenseUnits.postTop && (
        <AdSense.Google {...config.adsenseUnits.postTop} />
      )}

      <div
        className="padding-top padding-bottom"
        dangerouslySetInnerHTML={{ __html: postNode.html }}
      />

      {config.hasAdsense && config.adsenseUnits.postBottom && (
        <AdSense.Google {...config.adsenseUnits.postBottom} />
      )}
      <PostDivider />

      {(post.categories?.length > 0 || post.tags?.length > 0) && (
        <>
          <div className="padding-top padding-bottom">
            <PostCategories
              categories={post.categories}
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

      {config.hasAdsense && config.adsenseUnits.matchedPostBottom && (
        <AdSense.Google {...config.adsenseUnits.matchedPostBottom} />
      )}

      <GithubComment />
    </div>
  );
};

export default Post;
