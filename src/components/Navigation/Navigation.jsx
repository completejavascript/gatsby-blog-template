import React, { Component } from "react";
import { Link } from "gatsby";
import "./Navigation.css";

export default class Navigation extends Component {
  render() {
    const { brand, title, links } = this.props;

    return (
      <nav className="navigation flex align-items-center">
        <div className="container flex align-items-center justify-content-space-between">
          <div className="brand">
            <Link className="flex align-items-center" to="/">
              <img className="image margin-right-half" src={brand} alt="Brand Image" />
              <span className="title"><strong>{title}</strong></span>
            </Link>
          </div>
          <div className="links text-right">
            {links.map(link => (
              <Link
                key={link.label}
                to={link.link}
                activeClassName="active"
                className="margin-left"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    );
  }
}
