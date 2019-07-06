import React from "react";
import ExternalLink from "./ExternalLink";
import { Link } from "gatsby";
import { isInteralLink } from "../../utils/helpers";

const AutoLink = (props) => (
  <>
  {
    isInteralLink(props.to) ? (
      <Link
        key={props.label}
        to={props.to}
        activeClassName={props.activeClassName}
        className={props.className}
        style={{...props.style}}
      >
        {props.children}
      </Link>
    ) : (
      <ExternalLink
        className={props.className}
        to={props.to}
        style={props.style}
      >
        {props.children}
      </ExternalLink>
    )
  }
  </>
);

export default AutoLink;