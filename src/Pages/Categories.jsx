import { useContext } from "react";
import { GlobalContext } from "../Components/Context";

const Categories = ({ onSelect }) => {
  const {
    categories,
    showCats,
    setShowCats,
    fetchMoviesByCategory,
    activeCategoryId,
    setActiveCategoryId,
    setPage,
    fetchMovies,
  } = useContext(GlobalContext);

  const commonGenres = [
    "All",
    "Action",
    "Animation",
    "Comedy",
    "Drama",
    "Horror",
    "Romance",
    "War",
    "Music",
  ];
 const commonCategories = [
  { id: 0, name: "All" },
  ...(categories?.filter((cat) => commonGenres.includes(cat.name)) || []),
];

  const handleCategoryClick = (cat) => {
    setShowCats(false);
    setActiveCategoryId(cat.id);
    setPage(1);

    if (cat.id === 0) {
      fetchMovies();
    } else {
      fetchMoviesByCategory(cat.id);
    }

    if (typeof window !== "undefined" && window.innerWidth < 1024 && onSelect) {
      onSelect();
    }
  };

  return (
    <div className="relative">
      <p
        onClick={() => setShowCats(!showCats)}
        className="text-purple-400 font-bold hover:text-purple-700 cursor-pointer"
      >
        Categories
      </p>

      {showCats && (
        <>
          <div
            className="fixed inset-0 bg-black/10 backdrop-blur-xs z-10"
            onClick={() => setShowCats(false)}
          ></div>

          <div className="absolute left-0 top-full lg:mt-2 mt-1 flex flex-col max-w-2xl flex-wrap  lg:gap-3  gap-2 items-center bg-white/90 p-3 shadow-md rounded-lg z-20">
            {commonCategories.map((cat) => (
              <h2
                key={cat.id}
                onClick={() => handleCategoryClick(cat)}
                className={`cursor-pointer font-semibold transition-colors duration-200 ${
                  activeCategoryId === cat.id
                    ? "text-white bg-purple-600 px-2 py-1 rounded"
                    : "text-purple-400 hover:text-purple-700"
                }`}
              >
                {cat.name}
              </h2>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Categories;
