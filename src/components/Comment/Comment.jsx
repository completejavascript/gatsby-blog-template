import React, { Component } from "react";
import Disqus from "./Disqus";

class Comment extends Component {
  state = {
    isShow: false
  }

  handleClick = () => {
    this.setState(prevState => ({
      isShow: !prevState.isShow
    }));
  }

  render() {
    const { extraClass, postNode } = this.props;

    return (
      <div className={`comment-container text-center ${extraClass}`}>
        {!this.state.isShow && (
          <button className="btn-primary" onClick={this.handleClick}>
            Load comments
          </button>
        )}

        {this.state.isShow && (
          <Disqus postNode={postNode} />
        )}
      </div>
    )
  }
}

export default Comment;