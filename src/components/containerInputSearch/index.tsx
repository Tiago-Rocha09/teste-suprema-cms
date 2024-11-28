"use client";
import { usePageList } from "@/contexts/pageList";
import { Card } from "../card";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../input";

export const ContainerInputSearch = () => {
  const { listPages } = usePageList();
  const { control, watch } = useForm({
    defaultValues: {
      searchTerm: "",
    },
  });

  const searchTerm = watch("searchTerm");

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm) {
        listPages(searchTerm);
      }
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  return (
    <Card>
      <Input
        placeholder="Buscar página"
        control={control}
        name="searchTerm"
      />
    </Card>
  );
};
