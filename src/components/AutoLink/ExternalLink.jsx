import React from "react";

const ExternalLink = ({ className, to, children, style }) => (
  <a
    className={className}
    href={to}
    target="_blank"
    rel="noopener noreferrer"
    style={{...style}}
  >
    {children}
  </a>
)

export default ExternalLink;