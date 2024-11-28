import { ReactNode, HTMLAttributes } from "react";

//O tipo abaixo deve ter Todas as propriedade de uma tag section e mais o children
export interface CardSectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}
