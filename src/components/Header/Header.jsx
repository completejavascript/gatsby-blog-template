import React from "react";

const Header = ({ title, className = "" }) => (
  <header
    className={`header-container border-bottom border-color-light-grey ${className}`}
  >
    <h1 className="margin-none padding-top-2 padding-bottom-2">{title}</h1>
  </header>
);

export default Header;
