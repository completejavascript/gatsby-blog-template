import React, { useEffect, useRef } from "react";
import PostTags from "./PostTags";
import PostShare from "./PostShare";
import PostDate from "./PostDate";
import PostDivider from "./PostDivider";
import PostCategories from "./PostCategories";
import AdSense from "react-adsense";
import {
  githubCommentRepo,
  githubCommentTheme,
  githubCommentTitle,
} from "../../../data/SiteConfig";
import "./Post.scss";
import "../../../content/styles/code-highlight.scss";

const Post = ({ postNode, config, slug }) => {
  const post = postNode.frontmatter;
  if (!post.id) {
    post.id = slug;
  }
  if (!post.category_id) {
    post.category_id = config.postDefaultCategoryID;
  }

  const commentBox = useRef(null);

  useEffect(() => {
    const commentScript = document.createElement("script");
    commentScript.async = true;
    commentScript.src = "https://utteranc.es/client.js";
    commentScript.setAttribute("repo", githubCommentRepo);
    commentScript.setAttribute("issue-term", "pathname");
    commentScript.setAttribute("id", "utterances");
    commentScript.setAttribute("theme", githubCommentTheme);
    commentScript.setAttribute("crossorigin", "anonymous");
    if (commentBox && commentBox.current) {
      commentBox.current.appendChild(commentScript);
    } else {
      console.log(`Error adding utterances comments on: ${commentBox}`);
    }
  }, []);

  return (
    <div className="post-container">
      <div className="meta-share-wrapper padding-top padding-bottom">
        <PostDate extraClass="meta-wrapper" date={post.date} />
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

      {config.hasAdsense && config.adsenseUnits.matchedPostBottom && (
        <AdSense.Google {...config.adsenseUnits.matchedPostBottom} />
      )}

      <div id="comments">
        <h2>{githubCommentTitle}</h2>
        <div ref={commentBox} className="comments" />
      </div>
    </div>
  );
};

export default Post;
