import { ComponentType } from "@/types/component";

type BaseComponent = {
  type: ComponentType.Text | ComponentType.RichText;
  value: string; // String para conteúdos de texto ou rich text
};

type ImageComponent = {
  type: ComponentType.Image;
  value: File; // File para imagens
};

type GridComponent = {
  type: ComponentType.Grid;
  children: Component[]; // Grid contém uma lista de outros componentes
};

type Component = BaseComponent | ImageComponent | GridComponent;

export type FormattedArrayItem = {
  component: Component;
};

export type FormattedData = {
  name: string;
  slug: string;
  description?: string;
  sections: FormattedArrayItem[];
}