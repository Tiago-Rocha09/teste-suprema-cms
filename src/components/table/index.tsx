import React from "react";
import { TableProps } from "./types";

export const Table = <T,>({ columns, data }: TableProps<T>) => {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={String(column.key)}
              className="text-left text-sm font-semibold py-2"
            >
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} className="border-t">
            {columns.map((column) => (
              <td key={String(column.key)} className="py-2">
                {column.render
                  ? column.render(row)
                  : (row[column.key] as React.ReactNode)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
