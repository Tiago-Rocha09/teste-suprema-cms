import { ComponentChildren } from "@/contexts/types";

export enum ComponentType {
  Grid = "grid",
  Text = "text",
  Image = "image",
  Banner = "banner",
  RichText = "richText",
}

export type GenericComponentProps = {
  sectionId: string;
  componentId: string;
  title: string;
  componentChildren?: ComponentChildren[] | null;
  isGridChildren?: boolean;
  isBannerChildren?: boolean;
};

export type PageListProps = {
  id: number;
  name: string;
  slug: string;
};
