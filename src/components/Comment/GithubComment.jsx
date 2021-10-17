import React, { useEffect, useRef } from "react";
import {
  githubCommentRepo,
  githubCommentTheme,
  githubCommentTitle,
} from "../../../data/SiteConfig";
import "./GithubComment.scss";

function GithubComment() {
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
    <div className="github-comment-wrapper" id="comments">
      <h2>{githubCommentTitle}</h2>
      <div ref={commentBox} className="comments" />
    </div>
  );
}

export default GithubComment;
