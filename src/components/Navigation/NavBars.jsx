import React from "react";
import Hamburger from "./Hamburger";

const NavBars = ({ color, handleClick, openDropdown }) => (
  <div
    onClick={handleClick} 
    className="navbars cursor-pointer padding"
  >
    <Hamburger open={openDropdown} />
  </div>
)

export default NavBars;