import React, { useEffect, useState } from "react";

const Pagination = ({ pageIndex, pageSize, totalItems, clicked }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(pageIndex);
  const totalPages = Math.ceil(totalItems / pageSize);
  const pagingItems = [];
  if (pageIndex instanceof Number === false) {
    pageIndex = parseInt(pageIndex);
  }
  useEffect(() => {
    setCurrentPageIndex(pageIndex);
  }, [pageIndex]);
  const pageButton = (i) => {
    return (
      <button
        key={i}
        className={`join-item btn ${i === currentPageIndex ? "btn-active" : ""}`}
        onClick={() => {
          setCurrentPageIndex(i); // Update the state instead of the prop directly
          clicked(i);
        }}
      >
        {i}
      </button>
    );
  };
  if (totalPages <= 7) {
    // Display all page numbers if there are 7 or fewer pages.
    for (let i = 1; i <= totalPages; i++) {
      pagingItems.push(pageButton(i));
    }
  } else {
    // Display ellipses before and after the central page numbers.
    const startPage = Math.max(1, currentPageIndex - 2);
    const endPage = Math.min(totalPages, currentPageIndex + 2);
    if (startPage > 1) {
      pagingItems.push(
        <>
          {pageButton(1)}
          <button key="start-ellipsis" className="join-item btn btn-disabled">
            ...
          </button>
        </>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      pagingItems.push(pageButton(i));
    }

    if (endPage < totalPages) {
      pagingItems.push(
        <>
          <button key="end-ellipsis" className="join-item btn btn-disabled">
            ...
          </button>
          {pageButton(totalPages)}
        </>
      );
    }
  }
  return (
    <div className="flex justify-center">
      <div className="join mb-8 outline">{pagingItems}</div>
    </div>
  );
};

export default Pagination;
