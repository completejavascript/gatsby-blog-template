import React, { Component } from "react";
import Article from "./Article";

class PostListing extends Component {
  state = {
    maxPosts:
      (this.props.hasLoadmore || this.props.forcePostsPerPage) &&
      this.props.postsPerPage
        ? this.props.postsPerPage
        : this.props.postList.length,
  };

  handleLoadmore = () => {
    const { hasLoadmore = false, numberLoadmore } = this.props;

    if (!hasLoadmore) return;

    this.setState((prevState) => ({
      maxPosts: prevState.maxPosts + numberLoadmore,
    }));
  };

  render() {
    const { postList, hasThumbnail = true, hasLoadmore = false } = this.props;
    const { maxPosts } = this.state;

    return (
      <>
        <div className="post-listing-container">
          {postList.map((post, index) => {
            if (index < maxPosts)
              return (
                <Article
                  key={post.title}
                  post={post}
                  hasThumbnail={hasThumbnail}
                />
              );

            return null;
          })}
        </div>
        {hasLoadmore && maxPosts < postList.length && (
          <div className="loadmore-wrapper margin-top padding-top-half text-center">
            <button className="btn-primary" onClick={this.handleLoadmore}>
              {this.props.btnLoadmore}
            </button>
          </div>
        )}
      </>
    );
  }
}

export default PostListing;
