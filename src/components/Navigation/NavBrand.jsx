import React from "react";
import AutoLink from "../AutoLink/AutoLink";

const NavBrand = ({ brand, title, size = "32px" }) => (
  <div className="brand">
    <AutoLink className="flex align-items-center" to="/">
      <img
        className="image margin-right-half border-radius"
        src={brand}
        alt="Brand Image"
        width={size}
        height={size}
      />
      <span className="title">
        <strong>{title}</strong>
      </span>
    </AutoLink>
  </div>
);

export default NavBrand;
