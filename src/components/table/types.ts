import { ReactNode } from "react";

export type TableProps<T> = {
  columns: {
    key: keyof T;
    title: string;
    render?: (row: T) => ReactNode;
  }[];
  data: T[];
};
