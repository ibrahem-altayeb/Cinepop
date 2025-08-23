import { GlobalContext } from "../Components/Context";
import { useContext } from "react";
import MovieCard from "../Components/MovieCard";

const Favorites = () => {
  const { favorite } = useContext(GlobalContext);

  return (
    <div>
      {favorite.length === 0 ? (
        <p className="lg:text-7xl text-2xl text-purple-400 font-bold flex font-serif italic justify-center items-center h-screen placeWords">
          no movies to show it
        </p>
      ) : (
        <div className="py-8 px-4 max-w-[1280px] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {favorite.map((movie) => (
            <MovieCard key={movie.id} movie={movie} fromFavorites={true} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
