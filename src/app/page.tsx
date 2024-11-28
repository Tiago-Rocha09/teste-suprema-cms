import { ContainerInputSearch } from "@/components/containerInputSearch";
import { ContainerPagesTable } from "@/components/containerPagesTable";
import { PageTitle } from "@/components/pageTitle";
import { ClientPageListProvider } from "@/providers/page";
import { pageService } from "@/services/pageSevice";
import { PageListProps } from "@/types/component";
import Link from "next/link";

export default async function Home() {
  const initialData: PageListProps[] = await pageService
    .listPages()
    .then((response) => {
      return response || [];
    });

  return (
    <main className="flex flex-col gap-8 w-full lg:w-[calc(100%-17rem)] px-4 ml-auto pr-4 mt-4 pb-48">
      <ClientPageListProvider>
        <ContainerInputSearch />
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center w-full gap-4">
          <PageTitle title="Lista de páginas" />
          <Link
            href="/page/new"
            className="bg-[#EFA144] text-black px-4 py-2 rounded"
          >
            Nova página
          </Link>
        </header>
        <ContainerPagesTable initialData={initialData} />
      </ClientPageListProvider>
    </main>
  );
}
