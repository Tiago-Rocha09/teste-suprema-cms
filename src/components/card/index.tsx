import { ReactNode } from "react";

export const Card = ({ children }: { children: ReactNode }) => {
  return <div className="bg-gray-50 shadow-md p-4 rounded-md w-full px-2 lg:px-6 py-3">{children}</div>;
};
