import { GlobalContext } from "../Components/Context";
import { useContext } from "react";
import MovieCard from "../Components/MovieCard";

const Favorites = () => {
  const { favorite } = useContext(GlobalContext);
  return (
    <div>
      {favorite.length === 0 ? (
        <p className="lg:text-7xl text-2xl text-2xl text-purple-400 font-bold flex font-serif italic justify-center items-center h-screen placeWords">
          no movies to show it
        </p>
      ) : (
        <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
          {favorite.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
