import { MenuItem } from "@headlessui/react";
import { DropdownItemProps } from "../type";

export const DropdownItem = ({ text, onClick }: DropdownItemProps) => {
  return (
    <MenuItem>
      <button
        onClick={onClick}
        type="button"
        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none w-full text-left"
      >
        {text}
      </button>
    </MenuItem>
  );
};
