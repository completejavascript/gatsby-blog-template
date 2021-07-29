import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./TipTrickWindow.scss";

const codeSnippet = `
/**
 * A currying function is a function that takes 
 * multiple arguments and turns it into 
 * a sequence of functions having only one argument 
 * at a time.
 */

// Simple curry function definition
function multiply(a) {
  return (b) => {
    return (c) => {
      return a * b * c;
    };
  };
}

console.log(multiply(1)(2)(3));
// Output: 6
`;

function TipTrickWindow() {
  return (
    <div className="tiptrick-window-container">
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
        {codeSnippet}
      </SyntaxHighlighter>
    </div>
  );
}

export default TipTrickWindow;
