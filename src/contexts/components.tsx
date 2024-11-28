import { ComponentType } from "@/types/component";
import { createContext, useContext, useState } from "react";
import { PageContextData, PageProviderProps, Section } from "./types";
import { defaultComponentValues } from "./constants";
import { generateRandomString } from "@/util";
import { pageService } from "@/services/pageSevice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const PageContext = createContext({} as PageContextData);

export function PageProvider({ children }: PageProviderProps) {
  const router = useRouter();

  const [sections, setSections] = useState<Section[]>([]);
  const [showModalAddComponent, setShowModalAddComponent] =
    useState<boolean>(false);
  const [currentSectionId, setCurrentSectionId] = useState<string | null>(null);
  const [currentGridParent, setCurrentGridParent] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  function addSection() {
    const newSection = {
      id: generateRandomString(),
      component: null,
    };

    setSections([...sections, newSection]);
  }

  function removeSection(sectionId: string) {
    const updatedSections = sections.filter(
      (section) => section.id !== sectionId
    );

    setSections(updatedSections);
  }

  function addComponent(componentType: ComponentType) {
    const newComponent = defaultComponentValues[componentType];

    const newSections = sections.map((section) => {
      if (section.id === currentSectionId) {
        if (currentGridParent) {
          const gridComponentChildren = section.component?.children;
          const newGridComponentChildren = gridComponentChildren?.map(
            (component) => {
              if (component.id === currentGridParent) {
                return {
                  ...component,
                  component: {
                    ...newComponent,
                  },
                };
              }
              return component;
            }
          );
          return {
            ...section,
            component: {
              ...section.component!,
              children: newGridComponentChildren,
            },
          };
        }
        return {
          ...section,
          component: {
            ...newComponent,
            type: newComponent.type,
          },
        };
      }

      return section;
    });

    setSections(newSections as Section[]);
    setCurrentSectionId(null);
    setCurrentGridParent(null);
  }

  function handleCloseModalAddComponent() {
    setShowModalAddComponent(false);
    setCurrentSectionId(null);
    setCurrentGridParent(null);
  }

  function handleOpenModalAddComponent(sectionId: string, gridParent?: string) {
    setShowModalAddComponent(true);
    setCurrentSectionId(sectionId);
    if (gridParent) {
      setCurrentGridParent(gridParent);
    }
  }

  function savePage(data: FormData, pageId: number, isEdit = false) {
    setLoading(true);
    if (isEdit) {
      pageService
        .updatePage(pageId, data)
        .then((response) => {
          if (response.error) {
            return toast.error(
              Array.isArray(response?.response?.data?.message)
                ? response.response.data.message.join(", ")
                : response?.response?.data?.message ||
                    "Erro ao atualizar página!",
              {
                duration: 4000,
              }
            );
          }
          toast.success("Página atualizada com sucesso!", {
            duration: 4000,
          });
          router.push("/");
        })
        .catch((error) => {
          console.log({ error });
          toast.error("Erro ao atualizar página!", {
            duration: 4000,
          });
        })
        .finally(() => {
          setLoading(false);
        });
      return;
    }
    pageService
      .createPage(data)
      .then((response) => {
        if (response.error) {
          return toast.error(
            Array.isArray(response?.response?.data?.message)
              ? response.response.data.message.join(", ")
              : response?.response?.data?.message || "Erro ao criar página!",
            {
              duration: 4000,
            }
          );
        }
        toast.success("Página criada com sucesso!", {
          duration: 4000,
        });
        router.push("/");
      })
      .catch((error) => {
        console.log({ error });
        toast.error("Erro ao criar página!", {
          duration: 4000,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <PageContext.Provider
      value={{
        showModalAddComponent,
        currentGridParent,
        sections,
        loading,
        removeSection,
        addSection,
        setInitialSections: setSections,
        addComponent,
        handleCloseModalAddComponent,
        handleOpenModalAddComponent,
        savePage
      }}
    >
      {children}
    </PageContext.Provider>
  );
}

export function usePage() {
  const context = useContext(PageContext);

  if (!context) {
    throw new Error("usePage must be used within a PageProvider");
  }

  return context;
}
