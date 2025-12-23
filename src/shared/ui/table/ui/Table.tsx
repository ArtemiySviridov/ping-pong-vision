import './Table.scss';
import type { Column } from '@/shared/types/tables/column.ts';
// import { ArrowDown01, ArrowDown10, ArrowDownUp } from 'lucide-react';

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (row: T) => void;
}

const Table = <T,>({ data, columns, onRowClick }: TableProps<T>) => {
  return (
    <table className="table">
      <thead className="table__head">
        <tr className="table__row">
          {columns.map((column) => (
            <th
              key={String(column.key)}
              className="table__cell table__cell--head"
            >
              <div className="table__head-content">
                <span>{column.title}</span>
              </div>
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="table__body">
        {data.map((row, rowIndex) => (
          <tr
            className="table__row table__row--body-row"
            style={{
              cursor: onRowClick ? 'pointer' : 'default',
              transition: 'all 0.3s ease',
            }}
            key={rowIndex}
            onClick={() => onRowClick?.(row)}
          >
            {columns.map((column) => (
              <td
                className="table__cell table__cell--body-cell"
                key={String(column.key)}
              >
                {column.render
                  ? column.render(
                      column.key === 'actions' ? undefined : row[column.key],
                      row,
                    )
                  : String(row[column.key as keyof T])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
