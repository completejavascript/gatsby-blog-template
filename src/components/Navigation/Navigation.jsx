import React, { Component } from "react";
import NavBrand from "./NavBrand";
import NavLinks from "./NavLinks";
import NavBars from "./NavBars";
import { FontAwesomeIcon } from "../Icons/FontAwesomeIcon";
import config from "../../../data/SiteConfig";
import "./Navigation.scss";

const SearchForm = ({ className }) => (
  <form
    className={`margin-bottom-none form-search ${className}`}
    action="/search/"
    method="get"
  >
    <input
      className="margin-bottom-none input-search"
      type="text"
      name="q"
      placeholder={config.searchWidgetPlaceHolder}
      required
      spellCheck="false"
      autoFocus={true}
    />
  </form>
);

class Navigation extends Component {
  state = {
    openDropdown: false,
    openSearch: false,
  };

  rootRef = React.createRef();

  handleHamburgerClicked = () => {
    if (!this.rootRef.current) return;

    if (this.state.openDropdown == false) {
      this.rootRef.current.style.boxShadow = this.navBoxShadow;
    } else {
      this.rootRef.current.style.boxShadow =
        window.pageYOffset === 0 && this.props.adaptiveBoxShadow
          ? "none"
          : this.navBoxShadow;
    }

    this.setState((prevState) => ({
      openDropdown: !prevState.openDropdown,
      openSearch: false,
    }));
  };

  handleSearchIconClicked = () => {
    if (!this.rootRef.current) return;

    if (this.state.openSearch == true) {
      this.rootRef.current.style.boxShadow =
        window.pageYOffset === 0 && this.props.adaptiveBoxShadow
          ? "none"
          : this.navBoxShadow;
    }

    this.setState((prevState) => ({
      openDropdown: false,
      openSearch: !prevState.openSearch,
    }));
  };

  handleScroll = () => {
    if (!this.rootRef.current) return;

    const currentScrollPos = window.pageYOffset;

    if (this.prevScrollpos >= currentScrollPos) {
      this.rootRef.current.style.top = "0";
      this.rootRef.current.style.boxShadow =
        window.pageYOffset === 0 && this.props.adaptiveBoxShadow
          ? "none"
          : this.navBoxShadow;
    } else {
      this.rootRef.current.style.top = `-${this.navHeight}`;
      this.setState(() => ({
        openDropdown: false,
        openSearch: false,
      }));
    }

    this.prevScrollpos = currentScrollPos;
  };

  componentDidMount() {
    if (!this.rootRef.current) return;

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
    const { brand, title, links, hideOnScroll, adaptiveBoxShadow } = this.props;
    const { openDropdown, openSearch } = this.state;

    let extraClass = hideOnScroll ? "hideOnScroll" : "";
    if (adaptiveBoxShadow) {
      extraClass += " adaptiveBoxShadow";
    }

    return (
      <nav
        className={`navigation-container background-color-white ${extraClass}`}
        ref={this.rootRef}
      >
        <div className="navigation-main container flex align-items-center justify-content-space-between">
          <NavBrand brand={brand} title={title} />
          <div className="navlinks-wrapper">
            {openSearch ? (
              <SearchForm className="desktop" />
            ) : (
              <NavLinks links={links} />
            )}

            <FontAwesomeIcon
              className={`${openSearch ? "icon-close" : "icon-search"}`}
              onClick={this.handleSearchIconClicked}
            />
            <NavBars
              color="#222"
              handleClick={this.handleHamburgerClicked}
              openDropdown={openDropdown}
            />
          </div>
        </div>

        {openDropdown && (
          <div className="navigation-dropdown container">
            <NavLinks links={links} isDropdown={true} />
          </div>
        )}

        {openSearch && <SearchForm />}
      </nav>
    );
  }
}

export default Navigation;
