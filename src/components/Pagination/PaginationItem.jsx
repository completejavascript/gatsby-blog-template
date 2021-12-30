import React from "react";
import { FontAwesomeIcon } from "../Icons/FontAwesomeIcon";
import AutoLink from "../AutoLink/AutoLink";

const PaginationItem = (props) => {
  const { value, currentPage, pathPrefix, pathPrefixPagination } = props;
  const isLeft = value === -1;
  const isRight = value === -2;

  let to = pathPrefix;

  if (isLeft) {
    to += `${pathPrefixPagination}/${currentPage - 3}`;
  } else if (isRight) {
    to += `${pathPrefixPagination}/${currentPage + 3}`;
  } else if (value !== 1) {
    to += `${pathPrefixPagination}/${value}`;
  }

  return (
    <AutoLink
      to={to}
      className={`pagination-item ${currentPage === value ? "active" : ""}`}
      activeClassName="active"
    >
      {isLeft && <FontAwesomeIcon className="icon-angle-double-left" />}

      {value > 0 && value}

      {isRight && <FontAwesomeIcon className="icon-angle-double-right" />}
    </AutoLink>
  );
};

export default PaginationItem;
