import { ReactNode } from "react";

export interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (row: T) => ReactNode;
}

interface Props<T> {
  columns: Column<T>[];
  data: T[];
  emptyText?: string;
}

function Table<T>({ columns, data, emptyText = "Không có dữ liệu" }: Props<T>) {
  if (!data.length) {
    return <div style={{ padding: 12, color: "var(--color-muted)" }}>{emptyText}</div>;
  }

  return (
    <table>
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
              <td key={String(col.key)}>{col.render ? col.render(row) : (row as any)[col.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
