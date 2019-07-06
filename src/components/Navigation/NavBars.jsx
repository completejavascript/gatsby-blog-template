import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavBars = ({ color, handleClick }) => (
  <div
    onClick={handleClick} 
    className="navbars cursor-pointer padding-top padding-bottom"
  >
    <FontAwesomeIcon 
      icon={["fas", "bars"]} 
      style={{ color }}
      size="lg"
    />
  </div>
)

export default NavBars;