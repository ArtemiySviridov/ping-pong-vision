import './Pagination.scss';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      <span className="pagination__pages">
        {currentPage} из {totalPages}
      </span>
      <button
        className="pagination__button"
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        <ChevronLeft strokeWidth={1.5} />
      </button>
      <button
        className="pagination__button"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        <ChevronRight strokeWidth={1.5} />
      </button>
    </div>
  );
};

export default Pagination;
