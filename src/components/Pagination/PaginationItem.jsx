import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
      {isLeft && (
        <FontAwesomeIcon icon={["fas", "angle-double-left"]} size="xs" />
      )}

      {value > 0 && value}

      {isRight && (
        <FontAwesomeIcon icon={["fas", "angle-double-right"]} size="xs" />
      )}
    </AutoLink>
  );
};

export default PaginationItem;
