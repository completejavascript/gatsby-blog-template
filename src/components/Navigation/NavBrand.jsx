import React from "react";
import AutoLink from "../AutoLink/AutoLink";

const NavBrand = ({ brand, title }) => (
  <div className="brand">
    <AutoLink className="flex align-items-center" to="/">
      <img
        className="image margin-right-half border-radius"
        src={brand}
        alt="Brand Image"
      />
      <span className="title">
        <strong>{title}</strong>
      </span>
    </AutoLink>
  </div>
);

export default NavBrand;
