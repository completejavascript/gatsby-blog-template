import React, { Component } from "react";
import NavBrand from "./NavBrand";
import NavLinks from "./NavLinks";
import NavBars from "./NavBars";
import "./Navigation.scss";

class Navigation extends Component {
  state = {
    responsive: false
  }

  handleClick = () => {
    this.setState((prevState) => ({
      responsive: !prevState.responsive
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
            <NavBars color="#222" handleClick={this.handleClick} />
          </div>
        </nav>
        {
          this.state.responsive ? (
            <nav className="navigation-dropdown-container background-color-white position-fixed width-full">
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