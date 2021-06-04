import React, { Component } from "react";
import Disqus from "./Disqus";

class Comment extends Component {
  state = {
    isShow: !this.props.lazyload,
  };

  handleClick = () => {
    this.setState((prevState) => ({
      isShow: !prevState.isShow,
    }));
  };

  render() {
    const { extraClass, postNode, btnLoadComments } = this.props;

    return (
      <div className={`comment-container text-center ${extraClass}`}>
        {!this.state.isShow && (
          <button className="btn-primary" onClick={this.handleClick}>
            {btnLoadComments}
          </button>
        )}

        {this.state.isShow && <Disqus postNode={postNode} />}
      </div>
    );
  }
}

export default Comment;
