import React from "react";
import AutoLink from "../AutoLink/AutoLink";

const NavLinks = ({ links, isDropdown = false }) => {
  const navLinksClassDropdown = "nav-links text-left";
  const navLinksClassNormal = "nav-links text-right";
  const navLinksClass = isDropdown ? navLinksClassDropdown : navLinksClassNormal;

  const itemClassDropdown = "item padding-top padding-bottom border-top-default";
  const itemClassNormal = "item margin-left";
  const itemClass = isDropdown ? itemClassDropdown : itemClassNormal;

  return (
    <div className={navLinksClass}>
      {links.map(link => (
        <AutoLink
          key={link.label}
          to={link.url}
          activeClassName="active"
          className={itemClass}
        >
          {link.label}
        </AutoLink>
      ))}
    </div>
  )
}

export default NavLinks;