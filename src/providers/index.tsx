"use client";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

export const ClientGlobalProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
};
