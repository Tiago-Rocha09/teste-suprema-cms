"use client";

import { useState } from "react";
import { ModalConfigProps } from "./type";

export const ModalConfig = ({ onConfirm, onCancel }: ModalConfigProps) => {
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBackgroundColor(event.target.value);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-semibold">Configurar Sessão</h2>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-800"
            onClick={onCancel}
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
            Escolha a cor de fundo da sessão:
          </p>
          <input
            type="color"
            value={backgroundColor}
            onChange={handleColorChange}
            className="w-full h-10"
          />
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end items-center border-t p-4">
          <button
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            onClick={onCancel}
            type="button"
          >
            Cancelar
          </button>
          <button
            className="ml-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            type="button"
            onClick={() => onConfirm({ bgColor: backgroundColor })}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};
