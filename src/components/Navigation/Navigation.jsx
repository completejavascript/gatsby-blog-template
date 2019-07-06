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

    return (
      <>
        <nav className="navigation-container flex align-items-center background-color-white">
          <div className="navigation-main container flex align-items-center justify-content-space-between">
            <NavBrand brand={brand} title={title} />
            <NavLinks links={links} />
            <NavBars 
              color="#222" 
              handleClick={this.handleClick} 
              openDropdown={this.state.openDropdown}
            />
          </div>
        </nav>
        {
          this.state.openDropdown ? (
            <nav className="navigation-dropdown-container background-color-white">
              <div className="navigation-dropdown container">
                <NavLinks links={links} isDropdown={true} />
              </div>
            </nav>
          ) : null
        }
      </>
    )
  }
}

export default Navigation;