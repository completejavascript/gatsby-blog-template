import React from "react";
import AutoLink from "../AutoLink/AutoLink";

const NavLinks = ({ links }) => (
  <div className="links text-right">
    {links.map(link => (
      <AutoLink
        key={link.label}
        to={link.url}
        activeClassName="active"
        className="item margin-left"
      >
        {link.label}
      </AutoLink>
    ))}
  </div>
)

export default NavLinks;