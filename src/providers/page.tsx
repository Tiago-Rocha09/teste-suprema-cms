"use client";
import { ReactNode } from "react";
import { PageProvider } from "@/contexts/components";
import { PageListProvider } from "@/contexts/pageList";

export const ClientPageProvider = ({ children }: { children: ReactNode }) => {
  return <PageProvider>{children}</PageProvider>;
};

export const ClientPageListProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  return <PageListProvider>{children}</PageListProvider>;
};
