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
    return `section.${sectionId}.${componentId}.grid.text.value`;
  }
  if (isBannerChildren) {
    return `section.${sectionId}.${componentId}.banner.text.value`;
  }
  return `section.${sectionId}.${componentId}.text.value`;
};

export const ComponentText = ({
  title,
  componentId,
  sectionId,
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
        title={title}
        handleRemove={() => handleRemoveSection(sectionId)}
        sectionId={sectionId}
        shouldHaveRemoveOption={!isGridChildren}
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
            setDefaultStyle="font-family: Montserrat;"
            setOptions={{
              buttonList: [
                ["bold", "underline", "italic"],
                ["fontColor", "hiliteColor"],
                ["removeFormat"],
              ],
            }}
          />
        )}
      />
    </div>
  );
};
