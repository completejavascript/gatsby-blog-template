import React from "react";
import PaginationItem from "./PaginationItem";
import "./Pagination.scss";

// condition: totalPages >= 2
const MAX_PAGINATION_ITEMS = 7;

const PAGINATION_LEFT = -1;
const PAGINATION_RIGHT = -2;

// For example: there is 9 pages
// [1], 2,  3,  4,  5,  -2,  9
//  1, [2], 3,  4,  5,  -2,  9
//  1,  2, [3], 4,  5,  -2,  9
//  1,  2,  3, [4], 5,  -2,  9
//  1, -1,  4, [5], 6,  -2,  9
//  1, -1,  5, [6], 7,  -2,  9
//  1, -1,  5,  6, [7], -2,  9
//  1, -1,  5,  6,  7,  [8], 9
//  1, -1,  5,  6,  7,   8, [9]

const Pagination = (props) => {
  const {
    currentPage,
    totalPages,
    pathPrefix,
    pathPrefixPagination,
    extraClass,
  } = props;

  const respArr = [];
  if (totalPages <= MAX_PAGINATION_ITEMS) {
    for (let i = 1; i <= totalPages; i++) {
      respArr.push(i);
    }
  } else if (currentPage <= 4) {
    for (let i = 1; i <= MAX_PAGINATION_ITEMS - 2; i++) {
      respArr.push(i);
    }
    respArr.push(PAGINATION_RIGHT, totalPages);
  } else if (totalPages - currentPage < 4) {
    respArr.push(1, PAGINATION_LEFT);
    for (let i = totalPages - 4; i <= totalPages; i++) {
      respArr.push(i);
    }
  } else {
    respArr.push(
      1,
      PAGINATION_LEFT,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      PAGINATION_RIGHT,
      totalPages
    );
  }

  return (
    <>
      {totalPages >= 2 && (
        <div className={`pagination-container ${extraClass}`}>
          {respArr.map((value, index) => (
            <PaginationItem
              key={`${pathPrefix}-${index}`}
              value={value}
              currentPage={currentPage}
              pathPrefix={pathPrefix}
              pathPrefixPagination={pathPrefixPagination}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Pagination;
