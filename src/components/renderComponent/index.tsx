import { ComponentType } from "@/types/component";
import { ComponentGrid } from "../componentGrid";
import { ComponentText } from "../componentText";
import { Component } from "@/contexts/types";
import { ComponentRichText } from "../componentRichText";
import { ComponentImageUpload } from "../componentImageUpload";
import { ComponentBanner } from "../componentBanner";

const renderComponent = (
  component: Component,
  sectionId: string,
  isGridChildren: boolean
) => {
  switch (component.type) {
    case ComponentType.Grid:
      return (
        <ComponentGrid
          sectionId={sectionId}
          componentId={component.id}
          componentChildren={component.children}
          title="Grid"
        />
      );
    case ComponentType.Text:
      return (
        <ComponentText
          sectionId={sectionId}
          title="Texto simples"
          componentId={component.id}
          isGridChildren={isGridChildren}
        />
      );
    case ComponentType.Image:
      return (
        <ComponentImageUpload
          sectionId={sectionId}
          title="Imagem"
          componentId={component.id}
          isGridChildren={isGridChildren}
        />
      );
    case ComponentType.Banner:
      return (
        <ComponentBanner
          sectionId={sectionId}
          title="Banner"
          componentId={component.id}
          isGridChildren={isGridChildren}
          componentChildren={component.children}
        />
      );
    case ComponentType.RichText:
      return (
        <ComponentRichText
          sectionId={sectionId}
          title="Editor de texto"
          componentId={component.id}
          isGridChildren={isGridChildren}
        />
      );
    default:
      return null;
  }
};

export { renderComponent };
