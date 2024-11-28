import { CardSectionProps } from "./types";

export const CardSection = ({ children, ...rest }: CardSectionProps) => {
  return (
    <section
      {...rest}
      className="bg-white border-2 border-dashed p-4 rounded-md w-full px-6 py-3 h-24 flex items-center justify-center cursor-pointer"
    >
      {children}
    </section>
  );
};
