
import { Link } from "react-router-dom";
import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import { useContext } from "react";
import { GlobalContext } from "./Context";
import { AiFillStar } from "react-icons/ai";

const MovieCard = ({ movie }) => {
  const { favorite, AddOrRemoveMovie } = useContext(GlobalContext);

  return (
    <div className="w-full max-w-[240px] mx-auto">
      <div className="flex flex-col h-full bg-white dark:bg-gray-800 overflow-hidden p-4 gap-4 rounded-2xl 
            border border-gray-200 dark:border-gray-700 
            transition-all duration-300 transform 
            hover:-translate-y-2 hover:scale-[1.02] 
            hover:border-purple-500 
            shadow-[0_2px_8px_rgba(168,85,247,0.15)] 
            dark:shadow-[0_2px_8px_rgba(168,85,247,0.25)] 
            hover:shadow-[0_4px_16px_rgba(168,85,247,0.35)] 
            dark:hover:shadow-[0_4px_16px_rgba(168,85,247,0.45)]">

        
        <div className="flex justify-between items-center">
          <div
            className="cursor-pointer text-purple-400 hover:text-purple-600 transition duration-300"
            onClick={() => AddOrRemoveMovie(movie)}
          >
            {favorite.findIndex((item) => item.id === movie.id) === -1 ? (
              <IoBookmarkOutline size={25} />
            ) : (
              <IoBookmark size={25} />
            )}
          </div>
          <span className="flex items-center gap-1">
            <AiFillStar size={20} className="text-yellow-400" />
            <p className="text-sm text-purple-400 font-medium">
              {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
            </p>
          </span>
        </div>

       
        <Link to={`/movie/${movie.id}`}>
          <div className="rounded-lg overflow-hidden aspect-[2/3] bg-gray-100">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "/src/assets/no-movie.png"
              }
              alt={movie.title}
              className="w-full h-full object-cover transition duration-300"
            />
          </div>

          <h1 className="mt-3 text-sm font-semibold text-black dark:text-white/75 truncate hover:text-purple-600 transition">
            {movie.title}
          </h1>

        
        <div className="flex justify-center mt-2">
  <p className="inline-block bg-purple-600 text-black dark:text-white/75  px-3 py-1 rounded-md text-xs font-medium text-center uppercase tracking-wider hover:bg-purple-700 transition whitespace-nowrap">
    More Details
  </p>
</div>


        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
