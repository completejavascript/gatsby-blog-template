import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavBars = ({ color }) => (
  <div className="navbars">
      <FontAwesomeIcon 
        icon={["fas", "bars"]} 
        style={{ color }}
      />
  </div>
)

export default NavBars;