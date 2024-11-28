"use client";

import { usePage } from "@/contexts/components";
import { ComponentType } from "@/types/component";
import { useState } from "react";
import toast from "react-hot-toast";

const availableComponents = [
  {
    key: ComponentType.Grid,
    name: "Grid",
    shouldHasChildren: true,
  },
  {
    key: ComponentType.Text,
    name: "Texto simples",
  },
  {
    key: ComponentType.RichText,
    name: "Editor de texto",
  },
  {
    key: ComponentType.Image,
    name: "Imagem",
  },
  {
    key: ComponentType.Banner,
    name: "Banner",
    shouldHasChildren: true,
  },
];

export const ModalAddComponent = () => {
  const { handleCloseModalAddComponent, addComponent, currentGridParent } =
    usePage();
  const [selectedComponent, setSelectedComponent] =
    useState<ComponentType | null>(null);

  const handleAddComponent = () => {
    if (!selectedComponent) {
      toast.error("Selecione um componente para adicionar");
      return;
    }
    addComponent(selectedComponent);
    handleCloseModalAddComponent();
    setSelectedComponent(null);
  };

  const filteredComponents = availableComponents.filter(
    (component) => !currentGridParent || !component.shouldHasChildren
  );

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-semibold">Adicionar Componente</h2>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-800"
            onClick={handleCloseModalAddComponent}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 space-y-4">
          <p className="text-sm text-gray-600">
            Escolha o tipo de componente que deseja adicionar:
          </p>
          <ul className="grid grid-cols-2 gap-4">
            {filteredComponents.map((component) => (
              <li key={component.key}>
                <button
                  type="button"
                  className={`w-full p-4 border rounded-lg hover:bg-gray-100 flex flex-col items-center ${
                    selectedComponent === component.key
                      ? "bg-gray-100"
                      : "bg-white"
                  }`}
                  onClick={() => setSelectedComponent(component.key)}
                >
                  <span className="text-lg font-medium">{component.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end items-center border-t p-4">
          <button
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            onClick={handleCloseModalAddComponent}
            type="button"
          >
            Cancelar
          </button>
          <button
            className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            type="button"
            onClick={handleAddComponent}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};
