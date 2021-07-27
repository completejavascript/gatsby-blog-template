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
      <div className="answer answer-1">
        <div className="avatar">
          <div className="status" />
        </div>
        <div className="detail">
          <div className="love" />
        </div>
      </div>
      <div className="answer answer-2">
        <div className="avatar">
          <div className="status" />
        </div>
        <div className="detail">
          <div className="love" />
        </div>
      </div>
    </div>
  );
}

export default AskAnswerAnimation;
