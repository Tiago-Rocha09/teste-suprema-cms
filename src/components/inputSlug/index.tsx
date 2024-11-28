import React from "react";
import { InputProps } from "./types";
import { useController, Control, FieldValues, Path } from "react-hook-form";

interface ControlledInputProps<T extends FieldValues> extends InputProps {
  control: Control<T>;
  name: Path<T>;
}

export const InputSlug = <T extends FieldValues>({
  label,
  containerClass = "",
  control,
  name,
  ...props
}: ControlledInputProps<T>) => {
  const {
    field: { ref, onChange, value, ...inputProps },
  } = useController({
    name,
    control,
  });

  // Função para validar e transformar o valor em uma slug
  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Remove caracteres inválidos e converte para lowercase
    const slug = inputValue
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "") // Permite apenas letras minúsculas, números e hífens
      .replace(/--+/g, "-"); // Remove múltiplos hífens consecutivos

    onChange(slug); // Atualiza o valor no estado controlado pelo React Hook Form
  };

  return (
    <fieldset className={containerClass}>
      {label && <label className="text-base font-normal">{label}</label>}
      <input
        className="w-full h-12 px-4 border border-gray-300 rounded-lg text-sm focus:shadow-[0_0_0_4px_#EFA144]"
        ref={ref}
        value={value}
        onChange={handleSlugChange} // Usa a função de validação
        {...inputProps}
        {...props}
      />
    </fieldset>
  );
};
