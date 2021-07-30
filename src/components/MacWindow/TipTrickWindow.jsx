import React, { useEffect, useState, useCallback, useRef } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

import AutoLink from "../AutoLink/AutoLink";

import codeSnippets from "../../../data/js-snippets";
import { getRandomExclude } from "../../utils/helpers";

import "./TipTrickWindow.scss";

function TipTrickWindow() {
  const [index, setIndex] = useState(-1);
  const [snippet, setSnippet] = useState(null);
  const lastIndex = useRef(-1);

  const chooseRandomIndex = useCallback(() => {
    const randomIdx = getRandomExclude(
      0,
      codeSnippets.length,
      lastIndex.current
    );
    setIndex(randomIdx);
  }, []);

  useEffect(() => {
    chooseRandomIndex();
  }, [chooseRandomIndex]);

  useEffect(() => {
    if (index >= 0 && index < codeSnippets.length) {
      setSnippet(codeSnippets[index]);
      lastIndex.current = index;
    }
  }, [index]);

  return (
    <div className="tiptrick-window-container">
      {snippet && snippet.data && snippet.link && (
        <>
          <SyntaxHighlighter
            language="javascript"
            style={tomorrow}
            customStyle={{
              margin: 0,
              padding: "0 1.5rem 1.5rem",
              overflow: "auto",
              height: "100%",
              borderRadius: 0,
              backgroundColor: "#2a373a",
            }}
          >
            {snippet.data}
          </SyntaxHighlighter>
          <div className="description">
            <span className="text-description">Xem bài viết</span>{" "}
            <AutoLink to={snippet.link}>chi tiết</AutoLink>{" "}
            <span className="text-description">
              hoặc{" "}
              <span
                className="cursor-pointer text-primary"
                onClick={chooseRandomIndex}
              >
                random
              </span>{" "}
              thủ thuật khác.
            </span>
          </div>
        </>
      )}
    </div>
  );
}

export default TipTrickWindow;
