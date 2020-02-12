import React from "react";
import classNames from "classnames";

function Pagination({ page, onPress }) {
  const allowPrev = page !== 1;
  const allowNext = page !== 2;

  return (
    <nav aria-label="Data grid navigation">
      <ul className="pagination justify-content-end">
        <li className={classNames("page-item", {
          disabled: !allowPrev,
        })}>
          <button
            type="button" className="page-link" tabIndex={allowPrev ? "1" : "-1"}
            onClick={() => onPress(1)}
          >
            Previous
          </button>
        </li>
        <li className={classNames("page-item", {
          active: page === 1
        })}>
          <button
            type="button" className="page-link"
            onClick={() => onPress(1)}
          >
            1
          </button>
        </li>
        <li className={classNames("page-item", {
          active: page === 2
        })}>
          <button
            type="button" className="page-link"
            onClick={() => onPress(2)}
          >
            2
          </button>
        </li>
        <li className={classNames("page-item", {
          disabled: !allowNext,
        })}>
          <button
            type="button" className="page-link"
            tabIndex={allowNext ? "1" : "-1"}
            onClick={() => onPress(2)}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
