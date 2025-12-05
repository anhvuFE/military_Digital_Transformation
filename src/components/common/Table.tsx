import { ReactNode } from "react";

export interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (row: T) => ReactNode;
  mobileHeader?: string;
}

interface Props<T> {
  columns: Column<T>[];
  data: T[];
  emptyText?: string;
  responsive?: boolean;
}

function Table<T>({
  columns,
  data,
  emptyText = "Không có dữ liệu",
  responsive = true,
}: Props<T>) {
  if (!data.length) {
    return <div className="p-3 text-muted text-center">{emptyText}</div>;
  }

  return (
    <>
      {/* Desktop Table */}
      <div
        className={
          responsive ? "hidden sm:block overflow-x-auto" : "overflow-x-auto"
        }
      >
        <table className="w-full">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={String(col.key)}>{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx}>
                {columns.map((col) => (
                  <td key={String(col.key)}>
                    {col.render ? col.render(row) : (row as any)[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      {responsive && (
        <div className="sm:hidden space-y-4">
          {data.map((row, idx) => (
            <div
              key={idx}
              className="card p-4 shadow-sm hover:shadow-md transition-all"
            >
              <div className="space-y-2">
                {columns.map((col) => (
                  <div
                    key={String(col.key)}
                    className="flex justify-between items-start gap-3"
                  >
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {col.mobileHeader || col.header}
                    </span>
                    <span className="text-sm text-right flex-1 text-gray-800">
                      {col.render ? col.render(row) : (row as any)[col.key]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Table;
