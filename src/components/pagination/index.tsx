import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { PaginationProps } from "./types";

export const Pagination = ({ currentPage, items }: PaginationProps) => {
  const currentIndex = currentPage - 1;
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === items.length - 1;

  return (
    <div className="md:pt-48 pt-24 md:pb-24">
      <nav
        className="isolate inline-flex -space-x-px rounded-md w-full justify-between h-10 gap-6 md:gap-0"
        aria-label="Pagination"
      >
        <button
          type="button"
          disabled={isFirst}
          className={`relative 
          inline-flex 
          items-center 
          rounded-full 
          px-4 
          py-3 
          w-1/2 md:w-fit
          justify-center
          text-secondary
          ${
            isFirst
              ? "bg-gray-100 text-gray-200 cursor-default"
              : "bg-yellow-200 hover:border hover:border-black"
          }
          focus:z-20 
          focus:outline-offset-0`}
        >
          <FaChevronLeft size={20} />
          <span>Próximo</span>
        </button>
        <section className="gap-1 hidden md:flex">
          {items.map((item) => (
            <button
              key={item}
              disabled={!item}
              type="button"
              aria-current="page"
              className={`relative 
              z-10 
              rounded-full
              ${currentPage === item ? "bg-primary border border-black" : ""}
              inline-flex 
              items-center 

              bg-indigo-600 
              justify-center
              w-10
              text-center
              text-sm  
              text-black 
              focus:z-20 
              focus-visible:outline 
              focus-visible:outline-2 
              focus-visible:outline-offset-2 
              focus-visible:outline-indigo-600`}
            >
              {item}
            </button>
          ))}
        </section>
        <button
          type="button"
          disabled={isLast}
          className={`relative 
          inline-flex 
          items-center 
          rounded-full
          px-4 
          py-3
          w-1/2 md:w-fit
          justify-center
          text-secondary 
          ${
            isLast
              ? "bg-gray-100 text-gray-200"
              : "bg-yellow-200 hover:border hover:border-black"
          }
          focus:z-20 
          focus:outline-offset-0`}
        >
          <span>Próximo</span>
          <FaChevronRight size={20} />
        </button>
      </nav>
    </div>
  );
};
