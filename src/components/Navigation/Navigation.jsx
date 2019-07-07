import React, { Component } from "react";
import NavBrand from "./NavBrand";
import NavLinks from "./NavLinks";
import NavBars from "./NavBars";
import "./Navigation.scss";

class Navigation extends Component {
  state = {
    openDropdown: false
  }

  handleClick = () => {
    this.setState((prevState) => ({
      openDropdown: !prevState.openDropdown
    }));
  }

  render() {
    const { brand, title, links } = this.props;
    const { openDropdown } = this.state;

    return (
      <>
        <nav className="navigation-container background-color-white">
          <div className="navigation-main container flex align-items-center justify-content-space-between">
            <NavBrand brand={brand} title={title} />
            <NavLinks links={links} />
            <NavBars 
              color="#222" 
              handleClick={this.handleClick} 
              openDropdown={openDropdown}
            />
          </div>
          {
            openDropdown ? (
              <div className="navigation-dropdown container">
                <NavLinks links={links} isDropdown={true} />
              </div>
            ) : null
          }
        </nav>
      </>
    )
  }
}

export default Navigation;