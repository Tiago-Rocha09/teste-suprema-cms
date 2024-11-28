import { ChipProps } from "./types";

export const Chip = ({ children }: ChipProps) => {
  return (
    <span className="px-2 py-1 bg-gray-200 rounded-full text-sm font-medium">
      {children}
    </span>
  );
};
