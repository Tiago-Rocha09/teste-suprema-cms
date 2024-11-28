"use client";

import { useForm } from "react-hook-form";
import { Input } from "../input";

export default function SearchInput({placeholder}: {placeholder: string}) {
  const { control } = useForm();
  return (
    <Input placeholder={placeholder} control={control} name="searchTerm" />
  );
}
