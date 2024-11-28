/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FormProvider, useForm } from "react-hook-form";
import { Card } from "../card";
import { Input } from "../input";
import SectionsArea from "../sectionsArea";
import { zodResolver } from "@hookform/resolvers/zod";
import { PageSchema, pageSchema } from "./pageSchema";
import { usePage } from "@/contexts/components";
import { useEffect } from "react";
import { transformToArray, transformToNestedObject } from "@/util";
import { serialize } from "object-to-formdata";
import { FormattedArrayItem } from "./types";
import { useRouter } from "next/navigation";
import { InputSlug } from "../inputSlug";

export const PageForm = ({ initialData }: { initialData?: any }) => {
  const router = useRouter();
  const methods = useForm<PageSchema>({
    resolver: zodResolver(pageSchema),
    defaultValues: initialData || {},
  });
  const { control, getValues, reset } = methods;

  const { setInitialSections, savePage, loading } = usePage();

  const onSubmit = () => {
    const data = getValues();
    const sectionsData = data.section;

    const formattedArray: FormattedArrayItem[] = transformToArray(sectionsData);
    console.log(formattedArray);
    return;
    const payload = serialize(
      {
        name: data.name,
        slug: data.slug,
        description: data.description,
        sections: formattedArray,
      },
      {
        indices: true,
      }
    );

    savePage(payload, initialData?.id, !!initialData);
  };

  useEffect(() => {
    if (initialData) {
      setInitialSections(initialData.section);
      const sectionsToHookForm = transformToNestedObject(initialData.section);

      reset({
        ...initialData,
        section: sectionsToHookForm,
      });
    }
  }, []);

  return (
    <FormProvider {...methods}>
      <form
        className="w-full flex flex-col gap-4"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <Card>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Nome da página"
              containerClass="col-span-1"
              control={control}
              name="name"
            />
            <InputSlug
              label="Slug"
              containerClass="col-span-1"
              control={control}
              name="slug"
            />
            <Input
              label="Descrição"
              containerClass="col-span-1 md:col-span-2"
              control={control}
              name="description"
            />
          </div>
        </Card>
        <h5 className="text-base font-semibold text-gray-700">
          Conteúdo da página
        </h5>

        <SectionsArea />

        <div className="text-end my-7 flex flex-col md:flex-row justify-end gap-4">
          <button
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            onClick={() => router.push("/")}
            type="button"
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-[#EFA144] text-black rounded-lg hover:bg-[#EFb014]"
            type="submit"
            disabled={loading}
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};
