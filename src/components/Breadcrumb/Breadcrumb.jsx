import React from "react";
import AutoLink from "../AutoLink/AutoLink";
import "./BreadCrumb.scss";

function BreadCrumb({ items }) {
  return (
    <div className="breadcrumb-container padding-top-2 text-description">
      {items &&
        items.map((item, index) => (
          <React.Fragment key={item.link || item.title}>
            {item.link ? (
              <AutoLink to={item.link} className="content">
                {item.title}
              </AutoLink>
            ) : (
              <span className="content nolink">{item.title}</span>
            )}
            {index < items.length - 1 ? (
              <span className="content">{" › "}</span>
            ) : null}
          </React.Fragment>
        ))}
    </div>
  );
}

export default BreadCrumb;
