import React from "react";
import classNames from "classnames";

function Pagination({ page, onPress, totalPages }) {
  const quantityPages = Math.ceil(totalPages / 10);
  const allowPrev = page !== 1;
  const allowNext = page !== quantityPages;

  const pages = () => {
    const pageIndicator = [];
    for (let i = 1; i <= quantityPages; ++i) {
      pageIndicator.push(
        <li
          key={`page-${i}`}
          className={classNames("page-item", {
            active: page === i
          })}
        >
          <button
            type="button" className="page-link"
            onClick={() => onPress(i)}
          >
            {i}
          </button>
        </li>
      );
    }

    return pageIndicator;
  }

  return (
    <nav aria-label="Data grid navigation">
      <ul className="pagination justify-content-end">
        <li className={classNames("page-item", {
          disabled: !allowPrev,
        })}>
          <button
            type="button" className="page-link" tabIndex={allowPrev ? "1" : "-1"}
            onClick={() => onPress(page - 1)}
          >
            Previous
          </button>
        </li>
        {pages()}
        <li className={classNames("page-item", {
          disabled: !allowNext,
        })}>
          <button
            type="button" className="page-link"
            tabIndex={allowNext ? "1" : "-1"}
            onClick={() => onPress(page + 1)}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
