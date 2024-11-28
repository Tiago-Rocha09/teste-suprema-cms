export type DropdownItemProps = {
  key: string;
  text: string;
  onClick?: () => void;
};

export type DropdownProps = {
  options: DropdownItemProps[];
};
