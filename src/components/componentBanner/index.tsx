import { GenericComponentProps } from "@/types/component";
import { ComponentHeader } from "../componentHeader";
import { ComponentImageUpload } from "../componentImageUpload";
import { ComponentText } from "../componentText";
import { usePage } from "@/contexts/components";

export const ComponentBanner = ({
  title,
  sectionId,
  isGridChildren,
  componentChildren,
}: GenericComponentProps) => {
  const { removeSection } = usePage();

  const componentImage = componentChildren?.find(
    (component) => component.component?.type === "image"
  );

  const componentText = componentChildren?.find(
    (component) => component.component?.type === "text"
  );

  return (
    <div className="border-2 border-dashed p-4 relative pt-8">
      <ComponentHeader
        title={title}
        sectionId={sectionId}
        handleRemove={() => removeSection(sectionId)}
        shouldHaveRemoveOption={!isGridChildren}
      />
      <ComponentImageUpload
        sectionId={sectionId}
        title="Imagem do banner"
        componentId={componentImage?.id || ""}
        isBannerChildren={true}
      />
      <ComponentText
        sectionId={sectionId}
        title="Texto do banner"
        componentId={componentText?.id || ""}
        isBannerChildren={true}
      />
    </div>
  );
};
