import { useState } from 'react';

export const usePagination = (totalItems: number, itemsPerPage: number) => {
  // Current page starts from 0 (zero-based index)
  const [currentPage, setCurrentPage] = useState(0);

  // Total number of pages calculated based on total items and items per page
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Go to the next page, but ensure it does not exceed the last page
  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  // Go to the previous page, but ensure it does not go below the first page
  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  return { currentPage, totalPages, handleNext, handlePrev, setCurrentPage };
};
