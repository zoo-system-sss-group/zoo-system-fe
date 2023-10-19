import React, { useState } from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center">
          <div className="join  mb-8 outline">
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`join-item btn ${number === currentPage ? "btn-active" : ""}`}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}
    </div>
    </div>
  );
};

export default Pagination;