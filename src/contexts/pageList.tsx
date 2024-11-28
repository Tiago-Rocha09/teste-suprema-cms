import { createContext, useContext, useState } from "react";
import { PageListContextData, PageProviderProps } from "./types";
import { pageService } from "@/services/pageSevice";
import { PageListProps } from "@/types/component";
import toast from "react-hot-toast";

const PageListContext = createContext({} as PageListContextData);

export function PageListProvider({ children }: PageProviderProps) {

  const [pages, setPages] = useState<PageListProps[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const listPages = async (searchTerm?: string) => {
    setLoading(true);
    pageService
      .listPages(searchTerm)
      .then((response) => {

        setPages(response || []);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  async function deletePage(pageId: number) {
    setLoading(true);
    pageService
      .deletePage(pageId)
      .then((response) => {
        if (response.error) {
          return toast.error(
            Array.isArray(response?.response?.data?.message)
              ? response.response.data.message.join(", ")
              : response?.response?.data?.message || "Erro ao deletar página!",
            {
              duration: 4000,
            }
          );
        }
        toast.success("Página deletada com sucesso!", {
          duration: 4000,
        });
        listPages();
      })
      .catch((error) => {
        console.log({ error });
        toast.error("Erro ao deletar página!", {
          duration: 4000,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <PageListContext.Provider
      value={{
        pages,
        loading,
        listPages,
        setInitialList: setPages,
        deletePage,
      }}
    >
      {children}
    </PageListContext.Provider>
  );
}

export function usePageList(initialPageList?: PageListProps[]) {
  const context = useContext(PageListContext);

  if (!context) {
    throw new Error("usePageList must be used within a PageProvider");
  }

  const { pages, setInitialList } = context;
  if (!pages && initialPageList) {
    setInitialList(initialPageList);
  }

  return context;
}
