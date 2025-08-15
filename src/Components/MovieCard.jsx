import { Link } from "react-router-dom";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import { useContext } from "react";
import { GlobalContext } from "./Context";

const MovieCard = ({ movie }) => {
  const { favorite, AddOrRemoveMovie } = useContext(GlobalContext);

  return (
    <div>
      <div className="flex flex-col w-60 overflow-hidden p-5 gap-5 rounded-2xl 
            border border-gray-200 dark:border-gray-900 
            transition-all duration-300 transform 
            hover:-translate-y-2 hover:scale-[1.02] 
            hover:border-[#a855f7] 
            hover:shadow-[0_3px_4px_rgba(168,85,247,0.3)]">
        <div className="flex justify-between items-center">
          <div
            className="text-purple-400 hover:text-purple-600 transition duration-300 ease-in-out"
            onClick={() => AddOrRemoveMovie(movie)}
          >
            {favorite.findIndex((item) => item.id === movie.id) === -1 ? (
              <IoBookmarkOutline size={25} color="purple" />
            ) : (
              <IoBookmark size={25} color="purple" />
            )}
          </div>
          <span className="flex gap-1">
            <img src="/src/assets/star (1).svg" alt="star" />
            <p className="text-md text-purple-400">
              {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
            </p>
          </span>
        </div>
        <Link to={`/movie/${movie.id}`}>
          {/* <div className="img-container overflow-hidden h-[150px] sm:h-[200px]  ">
            <img
              width="220"
              height="400"
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "/src/assets/no-movie (1).png"
              }
              alt={movie.title}
              className="transition w-full h-full duration-200 object-fit aspect-auto rounded-md"
            />
          </div> */}
          <div className="h-70 overflow-hidden group rounded-2xl bg-transparent lg:mt-0 mt-4">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "/src/assets/no-movie (1).png"
              }
              alt={movie.title}
              className="w-full h-full object-contain block duration-300"
            />
          </div>
          <div className="flex flex-nowrap items-center justify-between">
            <h1 className="text-md font-bold mt-3 duration-300 ease-in-out text-purple-400 hover:text-purple-500 truncate max-w-[70%]">
              {movie.title}
            </h1>
          </div>
          <div>
            <p className="mt-3 bg-purple-600 text-white px-3 py-1 rounded-lg uppercase font-medium text-sm tracking-wider text-center hover:bg-purple-700 transition duration-300 ease-in-out">
              More Details
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
