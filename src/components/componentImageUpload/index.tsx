import { GenericComponentProps } from "@/types/component";
import { ComponentHeader } from "../componentHeader";
import { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useFormContext } from "react-hook-form";
import { usePage } from "@/contexts/components";

const getInputName = (
  isGridChildren: boolean,
  isBannerChildren: boolean,
  componentId: string,
  sectionId: string
) => {
  if (isGridChildren) {
    return `section.${sectionId}.${componentId}.grid.image.value`;
  }
  if (isBannerChildren) {
    return `section.${sectionId}.${componentId}.banner.image.value`;
  }
  return `section.${sectionId}.${componentId}.image.value`;
};

export const ComponentImageUpload = ({
  title,
  componentId,
  sectionId,
  isGridChildren,
  isBannerChildren,
}: GenericComponentProps) => {
  const { setValue, watch, unregister } = useFormContext();
  const { removeSection } = usePage();

  const handleRemoveSection = (id: string) => {
    // Remove os campos da sessão no React Hook Form
    unregister(`section.${id}`);
    // Remove a sessão do estado do componente
    removeSection(id);
  };
  
  const watchImage = watch(
    getInputName(!!isGridChildren, !!isBannerChildren, componentId, sectionId)
  );

  const [image, setImage] = useState<string | ArrayBuffer | null>("");
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue(
        getInputName(
          !!isGridChildren,
          !!isBannerChildren,
          componentId,
          sectionId
        ),
        file
      );
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (typeof watchImage === "string") {
      setImage(watchImage);
    }
  }, [watchImage]);

  return (
    <div className="border-2 border-dashed p-4 relative pt-8">
      <ComponentHeader
        sectionId={sectionId}
        shouldHaveConfigOption={false}
        shouldHaveRemoveOption={!isGridChildren}
        title={title}
        handleRemove={() => handleRemoveSection(sectionId)}
      />
      <div>
        <label className="cursor-pointer p-4 flex flex-col justify-center items-center min-h-52">
          {image && (
            <img src={image as string} alt="Preview" className="mt-4" />
          )}
          <FaCloudUploadAlt size={32} /> Clique para fazer upload da imagem
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
};
