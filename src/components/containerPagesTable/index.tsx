"use client";
import { usePageList } from "@/contexts/pageList";
import { Card } from "../card";
import { Chip } from "../chip";
import { Dropdown } from "../dropdown";
import { Table } from "../table";
import { PageListProps } from "@/types/component";
import { useRouter } from "next/navigation";
import { ModalConfirmRemove } from "../modalConfirmRemove";
import { useState } from "react";

export const ContainerPagesTable = ({
  initialData,
}: {
  initialData: PageListProps[];
}) => {
  const router = useRouter();
  const [idToRemove, setIdToRemove] = useState<number | null>(null);

  const { pages, loading, deletePage } = usePageList(initialData);
  const handleOpenRemoveModal = (pageId: number) => {
    setIdToRemove(pageId);
  };

  const handleCloseRemoveModal = () => {
    setIdToRemove(null);
  };

  const handleConfirmRemove = () => {
    deletePage(Number(idToRemove));
    setIdToRemove(null);
  };

  const columns: {
    key: "id" | "name" | "slug";
    title: string;
    render?: (row: {
      id: number;
      name: string;
      slug: string;
    }) => React.ReactNode;
  }[] = [
    { title: "Id", key: "id" },
    { title: "Nome", key: "name" },
    {
      title: "Slug",
      key: "slug",
      render: (row: { id: number; name: string; slug: string }) => (
        <Chip>{row.slug}</Chip>
      ),
    },
    {
      title: "Opções",
      key: "slug",
      render: (row: { id: number; name: string; slug: string }) => (
        <Dropdown
          options={[
            {
              key: "see",
              text: "Ver página no site",
              onClick: () => {
                const url = `${process.env.NEXT_PUBLIC_SITE_URL}/${row.slug}`;
                window.open(url, "_blank");
              },
            },
            {
              key: "edit",
              text: "Editar",
              onClick: () => {
                router.push(`/page/${row.id}`);
              },
            },
            {
              key: "delete",
              text: "Deletar",
              onClick: () => {
                handleOpenRemoveModal(row.id);
              },
            },
          ]}
        />
      ),
    },
  ];

  return (
    <Card>
      {loading && <p>Carregando...</p>}
      {!loading && <Table columns={columns} data={pages || []} />}
      {!!idToRemove && (
        <ModalConfirmRemove
          onCancel={handleCloseRemoveModal}
          onConfirm={handleConfirmRemove}
          text="Tem certeza que deseja remover a página?"
          loading={loading}
        />
      )}
    </Card>
  );
};
