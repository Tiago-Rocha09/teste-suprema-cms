import { PageForm } from "@/components/pageForm";
import { PageSchema } from "@/components/pageForm/pageSchema";
import { PageTitle } from "@/components/pageTitle";
import { ClientPageProvider } from "@/providers/page";
import { pageService } from "@/services/pageSevice";

type PageFormProps = {
  params: {
    pageId: number | string;
  };
};

export default async function Page({ params }: PageFormProps) {

  const pageParams = await params;
  const isEdit = pageParams.pageId !== "new";
  const pageTitle = !isEdit ? "Nova página" : "Editar página";

  const initialData: PageSchema = isEdit
    ? await pageService.findPage(Number(pageParams.pageId)).then((response) => {

        return response || null;
      })
    : null;

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-[calc(100%-17rem)] ml-auto pr-4 mt-4">
      <ClientPageProvider>
        <header className="w-full">
          <PageTitle title={pageTitle} />
        </header>
        <PageForm initialData={initialData} />
      </ClientPageProvider>
    </main>
  );
}
