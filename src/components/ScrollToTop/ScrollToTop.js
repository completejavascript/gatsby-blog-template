import React from "react";
import { FontAwesomeIcon } from "../Icons/FontAwesomeIcon";
import "./ScrollToTop.css";

class ScrollToTop extends React.Component {
  rootRef = React.createRef();

  handleClick = () => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  };

  showOrHideBackToTopButton = () => {
    const thresholdTop = this.props.thresholdTop || 100;

    if (
      document.body.scrollTop > thresholdTop ||
      document.documentElement.scrollTop > thresholdTop
    ) {
      this.rootElm.style.display = "block";
    } else {
      this.rootElm.style.display = "none";
    }
  };

  handleScroll = () => {
    if (this.debounceTimer) {
      window.clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = window.setTimeout(() => {
      this.showOrHideBackToTopButton();
    }, 100);
  };

  componentDidMount() {
    this.rootElm = this.rootRef.current;
    this.showOrHideBackToTopButton();

    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    const { bgColor, color } = this.props;

    return (
      <div
        ref={this.rootRef}
        onClick={this.handleClick}
        className={`scroll-to-top position-fixed background-color-${bgColor} 
          cursor-pointer transition padding line-height-reset border-radius`}
      >
        <FontAwesomeIcon
          className="icon-angle-up"
          style={{ color, fontWeight: 600 }}
        />
      </div>
    );
  }
}

export default ScrollToTop;
