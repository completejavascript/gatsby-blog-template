import React, { useEffect, useState, useCallback, useRef } from "react";
import { PrismAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

import AutoLink from "../AutoLink/AutoLink";

import { getRandom } from "../../utils/helpers";

import "./TipTrickWindow.scss";

function TipTrickWindow() {
  const [index, setIndex] = useState(-1);
  const [snippet, setSnippet] = useState(null);

  const codeSnippets = useRef([]);
  const lastIndex = useRef(-1);

  /**
   * Arrays are used to get random index
   */
  let randomArr = useRef([]);
  let buffArr = useRef([]);

  const chooseRandomIndex = useCallback(async () => {
    if (randomArr.current.length == 0) {
      randomArr.current = [...buffArr.current];
      buffArr.current = [];
    }

    const randomIdx = getRandom(0, randomArr.current.length);
    const randomIdxValue = randomArr.current[randomIdx];

    randomArr.current.splice(randomIdx, 1);
    buffArr.current.push(randomIdxValue);

    setIndex(randomIdxValue);
  }, []);

  useEffect(() => {
    if (index >= 0 && index < codeSnippets.current.length) {
      setSnippet(codeSnippets.current[index]);
      lastIndex.current = index;
    }
  }, [index]);

  useEffect(() => {
    async function fetchSnippets() {
      const data = await import("../../../data/js-snippets");
      codeSnippets.current = data.default;

      // fill data for random array
      randomArr.current = Array.from(Array(codeSnippets.current.length).keys());
      buffArr.current = [];

      // choose random index
      chooseRandomIndex();
    }

    fetchSnippets();
  }, []);

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
