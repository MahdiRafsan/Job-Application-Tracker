import { useDispatch, useSelector } from "react-redux";

import {
  changeCurrentPage,
  setLimitPerPage,
} from "../../features/jobs/jobSlice";

import Button from "../button/button";
import Dropdown from "../dropdown-input/dropdown";
import { LIMIT_OPTIONS } from "../dropdown-input/dropdown-options";

import "./pagination.css";

const Pagination = () => {
  const dispatch = useDispatch();
  const { currentPage, limit, totalPages } = useSelector((state) => state.job);

  // return an array of elements from start to end
  const range = (start, end) => {
    let length = end - start + 1;
    return Array.from({ length }, (el, i) => start + i);
  };

  const getPagesArray = (pageNeighbors = 1) => {
    // pageNeighbor + firstPage + lastPage + currentPage + 2 * dots
    const totalPagesToDisplay = pageNeighbors + 5;

    // no of available pages less than minimum number of pages we want to show
    if (totalPages <= totalPagesToDisplay) {
      return range(1, totalPages);
    }

    // indices are within range of 1 to totalPages
    const indexOfFirstPage = Math.max(currentPage - pageNeighbors, 1);
    const indexOfLastPage = Math.min(currentPage + pageNeighbors, totalPages);

    // show dots when there is at least 2 items between neighbor and page limit
    const hasLeftDots = indexOfFirstPage > 3;
    const hasRightDots = indexOfLastPage < totalPages - 2;

    // [1, 2, 3, 4, ..., 100]
    if (!hasLeftDots && hasRightDots) {
      let leftItemCount = 3 + 2 * pageNeighbors;
      let leftRange = range(1, leftItemCount);
      return [...leftRange, "...", totalPages];
    }

    // [1, ..., 97, 98, 99, 100]
    if (hasLeftDots && !hasRightDots) {
      let rightItemCount = 3 + 2 * pageNeighbors;
      let rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [1, "...", ...rightRange];
    }

    // [1, ..., 45, 46, 47, ..., 100]
    if (hasLeftDots && hasRightDots) {
      let middleRange = range(indexOfFirstPage, indexOfLastPage);
      return [1, "...", ...middleRange, "...", totalPages];
    }

    return range(1, totalPages);
  };

  const pagesArray = getPagesArray();

  const previousPageHandler = () => {
    let previousPage;
    if (currentPage > 1) {
      previousPage = currentPage - 1;
    }
    dispatch(changeCurrentPage(previousPage));
  };

  const nextPageHandler = () => {
    let nextPage;
    if (currentPage !== totalPages) {
      nextPage = currentPage + 1;
    }
    dispatch(changeCurrentPage(nextPage));
  };

  const onLimitChangeHandler = (e) => {
    dispatch(setLimitPerPage(e.target.value));
  };

  if (totalPages < 2) return;

  return (
    <div className="pagination">
      <div className='page-limit'>
        <Dropdown
          label="Jobs Per Page: "
          id="limit"
          name="limit"
          value={limit}
          options={LIMIT_OPTIONS}
          onChange={onLimitChangeHandler}
        />
      </div>
      <div className='page-button'>
        <Button
          type="button"
          buttonType="info"
          onClick={previousPageHandler}
          disabled={currentPage === 1}
        >
          &lt;&lt;
        </Button>
        {pagesArray.map((pageNumber, idx) => {
          if (pageNumber === "...") {
            return (
              <Button key="123456789" id="dot-btn" buttonType="info">
                &hellip;
              </Button>
            );
          }
          return (
            <Button
              key={idx}
              type="button"
              buttonType="info"
              onClick={() => {
                dispatch(changeCurrentPage(pageNumber));
              }}
              disabled={currentPage === pageNumber}
            >
              {pageNumber}
            </Button>
          );
        })}
        <Button
          type="button"
          buttonType="info"
          onClick={nextPageHandler}
          disabled={currentPage === totalPages}
        >
          &gt;&gt;
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
