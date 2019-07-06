import React from "react";
import "./Hamburger.scss";

const Hamburger = ({ open }) => (
  <div className={`hamburger ${open ? "open" : ""}`}>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
)

export default Hamburger;