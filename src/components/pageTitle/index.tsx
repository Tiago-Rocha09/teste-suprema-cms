type PageTitleProps = {
  title: string;
};

export const PageTitle = ({ title }: PageTitleProps) => {
  return <h1 className="text-2xl font-bold text-gray-800">{title}</h1>;
};
