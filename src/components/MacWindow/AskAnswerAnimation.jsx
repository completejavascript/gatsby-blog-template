import React from "react";
import "./AskAnswerAnimation.scss";

function AskAnswerAnimation() {
  return (
    <div className="ask-answer-animation-container">
      <div className="asker">
        <div className="avatar">
          <div className="status" />
        </div>
        <div className="info">
          <div className="name">
            <div className="question-bubble" />
          </div>
          <div className="date" />
        </div>
      </div>
      <div className="content" />
      <div className="answer">
        <div className="avatar" />
        <div className="detail" />
      </div>
      <div className="answer">
        <div className="avatar" />
        <div className="detail" />
      </div>
    </div>
  );
}

export default AskAnswerAnimation;
