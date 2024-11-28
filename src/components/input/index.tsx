import React from "react";
import { InputProps } from "./types";
import { useController, Control, FieldValues, Path } from "react-hook-form";

interface ControlledInputProps<T extends FieldValues> extends InputProps {
  control: Control<T>;
  name: Path<T>;
}

export const Input = <T extends FieldValues>({
  label,
  containerClass = "",
  control,
  name,
  ...props
}: ControlledInputProps<T>) => {
  const {
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
  });

  return (
    <fieldset className={containerClass}>
      {label && <label className="text-base font-normal">{label}</label>}
      <input
        className="w-full h-12 px-4 border border-gray-300 rounded-lg text-sm focus:shadow-[0_0_0_4px_#EFA144]"
        ref={ref}
        {...inputProps}
        {...props}
      />
    </fieldset>
  );
};
