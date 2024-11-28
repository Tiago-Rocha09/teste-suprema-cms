export type ComponentHeaderProps = {
  title: string;
  handleRemove: () => void;
  shouldHaveConfigOption?: boolean;
  shouldHaveRemoveOption?: boolean;
  sectionId: string;
};
