import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { FaEllipsisV } from "react-icons/fa";
import { DropdownProps } from "./type";
import { DropdownItem } from "./dropdownItem";

export const Dropdown = ({ options = [] }: DropdownProps) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton>
          <FaEllipsisV />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          {options.map((item) => (
            <DropdownItem key={item.key} text={item.text} onClick={item.onClick} />
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
};
