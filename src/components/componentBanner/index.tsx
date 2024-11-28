import { GenericComponentProps } from "@/types/component";
import { ComponentHeader } from "../componentHeader";
import { ComponentImageUpload } from "../componentImageUpload";
import { ComponentText } from "../componentText";
import { usePage } from "@/contexts/components";
import { useFormContext } from "react-hook-form";

export const ComponentBanner = ({
  title,
  sectionId,
  isGridChildren,
  componentChildren,
}: GenericComponentProps) => {
  const { removeSection } = usePage();
  const { unregister } = useFormContext();

  const handleRemoveSection = (id: string) => {
    // Remove os campos da sessão no React Hook Form
    unregister(`section.${id}`);
    // Remove a sessão do estado do componente
    removeSection(id);
  };

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
        handleRemove={() => handleRemoveSection(sectionId)}
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
