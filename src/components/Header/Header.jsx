import React from "react";

const Header = ({ title }) => (
  <header className="border-bottom border-color-light-grey">
    <div className="container">
      <h1 className="margin-none padding-top-2 padding-bottom-2">{title}</h1>
    </div>
  </header>
);

export default Header;
