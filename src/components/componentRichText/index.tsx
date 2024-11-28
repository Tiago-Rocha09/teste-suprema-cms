import { GenericComponentProps } from "@/types/component";
import SunEditor from "suneditor-react";
import { ComponentHeader } from "../componentHeader";
import { Controller, useFormContext } from "react-hook-form";
import { usePage } from "@/contexts/components";

const getInputName = (
  isGridChildren: boolean,
  isBannerChildren: boolean,
  componentId: string,
  sectionId: string
) => {
  if (isGridChildren) {
    return `section.${sectionId}.${componentId}.grid.richText.value`;
  }
  if (isBannerChildren) {
    return `section.${sectionId}.${componentId}.banner.richText.value`;
  }
  return `section.${sectionId}.${componentId}.richText.value`;
};

export const ComponentRichText = ({
  title,
  sectionId,
  componentId,
  isGridChildren,
  isBannerChildren,
}: GenericComponentProps) => {
  const { control, unregister } = useFormContext();

  const { removeSection } = usePage();
  
  const handleRemoveSection = (id: string) => {
    // Remove os campos da sessão no React Hook Form
    unregister(`section.${id}`);
    // Remove a sessão do estado do componente
    removeSection(id);
  };

  return (
    <div className="border-2 border-dashed p-4 relative pt-8">
      <ComponentHeader
        sectionId={sectionId}
        title={title}
        shouldHaveRemoveOption={!isGridChildren}
        handleRemove={() => handleRemoveSection(sectionId)}
      />
      <Controller
        name={getInputName(
          !!isGridChildren,
          !!isBannerChildren,
          componentId,
          sectionId
        )}
        control={control}
        // defaultValue=""
        render={({ field }) => (
          <SunEditor
            {...field}
            defaultValue={field.value}
            onChange={(content) => field.onChange(content)}
            setDefaultStyle="font-family: Montserrat; min-height: 300px;"
            setOptions={{
              buttonList: [
                ["font", "fontSize", "formatBlock"],
                ["blockquote"],
                ["bold", "underline", "italic"],
                ["fontColor", "hiliteColor"],
                ["removeFormat"],
                ["align", "horizontalRule", "list", "lineHeight"],
                ["table", "link", "image", "video"],
                ["fullScreen", "showBlocks", "codeView"],
                ["undo", "redo"],
              ],
            }}
          />
        )}
      />
    </div>
  );
};
