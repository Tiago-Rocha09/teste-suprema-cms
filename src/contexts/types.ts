import { ComponentType, PageListProps } from "@/types/component";
import { ReactNode } from "react";

export type Section = {
  id: string;
  component: Component | null;
};

export type ComponentChildren = {
  id: string;
  component: Component | null;
};

export type Component = {
  id: string;
  type: ComponentType;
  children: ComponentChildren[] | null;
};

export type PageContextData = {
  showModalAddComponent: boolean;
  currentGridParent: string | null;
  sections: Section[];
  loading: boolean;
  addSection: () => void;
  setInitialSections: (initialSections: Section[]) => void;
  removeSection: (sectionId: string) => void;
  addComponent: (componentType: ComponentType) => void;
  handleCloseModalAddComponent: () => void;
  handleOpenModalAddComponent: (sectionId: string, gridParent?: string) => void;
  savePage: (data: FormData, pageId: number, isEdit?: boolean) => void;
};

export type PageListContextData = {
  loading: boolean;
  pages: PageListProps[] | null;
  listPages: (searchTerm?: string) => Promise<void>;
  setInitialList: (initialList: PageListProps[]) => void;
  deletePage: (pageId: number) => void;
};

export type PageProviderProps = {
  children: ReactNode;
};
