import React, { Component } from "react";
import NavBrand from "./NavBrand";
import NavLinks from "./NavLinks";
import NavBars from "./NavBars";
import "./Navigation.scss";

class Navigation extends Component {
  state = {
    openDropdown: false,
  };

  rootRef = React.createRef();

  handleClick = () => {
    if (this.state.openDropdown == false) {
      this.rootRef.current.style.boxShadow = this.navBoxShadow;
    }

    this.setState((prevState) => ({
      openDropdown: !prevState.openDropdown,
    }));
  };

  handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    if (this.prevScrollpos > currentScrollPos) {
      this.rootRef.current.style.top = "0";
      this.rootRef.current.style.boxShadow =
        window.pageYOffset === 0 ? "none" : this.navBoxShadow;
    } else {
      this.rootRef.current.style.top = `-${this.navHeight}`;
      if (this.state.openDropdown) {
        this.setState(() => ({
          openDropdown: false,
        }));
      }
    }
    this.prevScrollpos = currentScrollPos;
  };

  componentDidMount() {
    this.prevScrollpos = window.pageYOffset;

    const computedStyle = getComputedStyle(this.rootRef.current);
    this.navHeight = computedStyle.getPropertyValue("--nav-height").trim();
    this.navBoxShadow = computedStyle
      .getPropertyValue("--nav-box-shadow")
      .trim();

    if (this.props.hideOnScroll) {
      window.addEventListener("scroll", this.handleScroll);
    }
  }

  componentWillUnmount() {
    if (this.props.hideOnScroll) {
      window.removeEventListener("scroll", this.handleScroll);
    }
  }

  render() {
    const { brand, title, links, hideOnScroll } = this.props;
    const { openDropdown } = this.state;
    const extraClass = hideOnScroll ? "hideOnScroll" : "";

    return (
      <nav
        className={`navigation-container background-color-white ${extraClass}`}
        ref={this.rootRef}
      >
        <div className="navigation-main container flex align-items-center justify-content-space-between">
          <NavBrand brand={brand} title={title} />
          <NavLinks links={links} />
          <NavBars
            color="#222"
            handleClick={this.handleClick}
            openDropdown={openDropdown}
          />
        </div>
        {openDropdown ? (
          <div className="navigation-dropdown container">
            <NavLinks links={links} isDropdown={true} />
          </div>
        ) : null}
      </nav>
    );
  }
}

export default Navigation;
