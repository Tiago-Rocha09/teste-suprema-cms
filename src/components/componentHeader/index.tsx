"use client";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { ComponentHeaderProps } from "./types";
import { ModalConfirmRemove } from "../modalConfirmRemove";
import { ModalConfig } from "../modalConfig"; // Supondo que você tenha um componente ModalConfig
import { useFormContext } from "react-hook-form";

export const ComponentHeader = ({
  title,
  handleRemove,
  sectionId,
  shouldHaveConfigOption = true,
  shouldHaveRemoveOption = true,
}: ComponentHeaderProps) => {
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const { setValue } = useFormContext();

  const handleOpenRemoveModal = () => {
    setIsRemoveModalOpen(true);
  };

  const handleCloseRemoveModal = () => {
    setIsRemoveModalOpen(false);
  };

  const handleConfirmRemove = () => {
    handleRemove();
    setIsRemoveModalOpen(false);
  };

  // const handleOpenConfigModal = () => {
  //   setIsConfigModalOpen(true);
  // };

  const handleCloseConfigModal = () => {
    setIsConfigModalOpen(false);
  };

  const handleConfirmConfig = (configData: { bgColor: string }) => {
    setValue(`section.${sectionId}.component.text.bgColor`, configData.bgColor);
    setIsConfigModalOpen(false);
  };

  return (
    <div className="absolute right-1 top-1 flex w-full justify-between px-4">
      <h6 className="text-base font-semibold text-gray-700">{title}</h6>
      <div className="flex items-center space-x-2">
        {shouldHaveConfigOption &&
          // (
          //   <button
          //     className="p-1 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
          //     type="button"
          //     onClick={handleOpenConfigModal}
          //   >
          //     <FaCog />
          //   </button>
          // )
          null}
        {shouldHaveRemoveOption && (
          <button
            className="p-1 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
            type="button"
            onClick={handleOpenRemoveModal}
          >
            <FaTrash />
          </button>
        )}
      </div>
      {isRemoveModalOpen && (
        <ModalConfirmRemove
          onCancel={handleCloseRemoveModal}
          onConfirm={handleConfirmRemove}
        />
      )}
      {isConfigModalOpen && (
        <ModalConfig
          onCancel={handleCloseConfigModal}
          onConfirm={handleConfirmConfig}
        />
      )}
    </div>
  );
};
