"use client";
import { usePage } from "@/contexts/components";
import { CardSection } from "../cardSection";
import { ModalAddComponent } from "../modalAddComponent";
import { AddComponentProps } from "./types";

export const AddComponent = ({ sectionId, gridParent }: AddComponentProps) => {
  const { handleOpenModalAddComponent, showModalAddComponent } = usePage();

  return (
    <>
      <CardSection
        onClick={() => handleOpenModalAddComponent(sectionId, gridParent)}
      >
        <p>Selecionar tipo de componente</p>
      </CardSection>
      {showModalAddComponent && <ModalAddComponent />}
    </>
  );
};
