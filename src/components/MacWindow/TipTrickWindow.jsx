import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

import codeSnippets from "../../../data/js-snippets";
import { getRandom } from "../../utils/helpers";

import "./TipTrickWindow.scss";

function TipTrickWindow() {
  const [index, setIndex] = useState(-1);
  const [snippet, setSnippet] = useState(null);

  useEffect(() => {
    const randomIdx = getRandom(0, codeSnippets.length);
    setIndex(randomIdx);
    console.log({ randomIdx });
  }, []);

  useEffect(() => {
    if (index >= 0 && index < codeSnippets.length) {
      setSnippet(codeSnippets[index]);
    }
  }, [index]);

  return (
    <div className="tiptrick-window-container">
      {snippet && snippet.data && (
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
      )}
    </div>
  );
}

export default TipTrickWindow;
