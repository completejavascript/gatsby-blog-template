import React from "react";
import NavBrand from "./NavBrand";
import NavLinks from "./NavLinks";
import NavBars from "./NavBars";
import "./Navigation.css";

const Navigation = ({ brand, title, links }) => (
  <nav className="navigation-container flex align-items-center">
    <div className="container flex align-items-center justify-content-space-between">
      <NavBrand brand={brand} title={title} />
      <NavLinks links={links} />
      <NavBars color="#222" />
    </div>
  </nav>
)

export default Navigation;