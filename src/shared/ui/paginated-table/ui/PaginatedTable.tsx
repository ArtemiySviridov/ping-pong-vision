import './PaginatedTable.scss';
import Table from '@/shared/ui/table';
import Pagination from '@/shared/ui/pagination';
import type { PaginatedTableProps } from './types.ts';
import MessagePanel from '@/shared/ui/MessagePanel';
import Loader from '@/shared/ui/loader';

const PaginatedTable = <T,>({
  data = [],
  columns,
  total = 0,
  currentPage = 1,
  onPageChange,
  isLoading,
  onRowClick,
}: PaginatedTableProps<T>) => {
  if (isLoading && data.length === 0) {
    return (
      <div className="players-table__center">
        <Loader size="large" />
      </div>
    );
  }

  if (!isLoading && data.length === 0) {
    return (
      <div className="players-table__center">
        <MessagePanel iconMood="sad" message="Пока что нет сыгранных матчей." />
      </div>
    );
  }

  return (
    <div className="players-table">
      <div className="players-table__pagination">
        <Pagination
          currentPage={currentPage}
          totalPages={total}
          onPageChange={onPageChange!}
        />
      </div>
      <Table data={data} columns={columns} onRowClick={onRowClick} />

      {isLoading && (
        <div className="players-table__overlay">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default PaginatedTable;
