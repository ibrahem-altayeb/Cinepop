import { useContext } from "react";
import { IoChevronBackSharp } from "react-icons/io5";
import { GrFormNext } from "react-icons/gr";
import { GlobalContext } from "./Context";
import { useSearchParams } from "react-router-dom";

function Pagination() {
  const { totalPages, movies } = useContext(GlobalContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || 1);

  const updatePage = (newPage) => {
    setSearchParams({ page: newPage });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex justify-end items-center gap-2 mt-6">
      {page > 1 && (
        <IoChevronBackSharp
          onClick={() => updatePage(page - 1)}
          className="w-10 h-10 text-purple-500 hover:text-purple-600 rounded-full cursor-pointer"
        />
      )}

      {Array.from({ length: totalPages }, (_, i) => i + 1)
        .filter((p) => Math.abs(p - page) <= 1)
        .map((p) => (
          <button
            key={p}
            onClick={() => updatePage(p)}
            className={`px-4 py-2 rounded-full ${
              p === page
                ? "bg-purple-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-purple-700"
            }`}
          >
            {p}
          </button>
        ))}

      {page < totalPages && movies.length > 0 && (
        <GrFormNext
          onClick={() => updatePage(page + 1)}
          className="w-12 h-12 text-purple-500 hover:text-purple-600 rounded-full cursor-pointer"
        />
      )}
    </div>
  );
}

export default Pagination;
