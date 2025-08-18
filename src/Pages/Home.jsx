import { GlobalContext } from "../Components/Context";
import { useContext } from "react";
import MovieCard from "../Components/MovieCard";
import { Circles } from "react-loader-spinner";
import Pagination from "../Components/Pagination";

const Home = () => {
  const { movies, loading, ScrollToTop, ButtonRef, scrollPage } =
    useContext(GlobalContext);

  return (
    <div className="relative">
      {loading ? (
        <div className="h-screen w-full flex justify-center items-center">
          <Circles
            height={"120"}
            width={"120"}
            color="rgb(130, 50, 200)"
            visible={true}
          />
        </div>
      ) : movies.length === 0 ? (
        <div className="flex justify-center items-center h-screen px-4 placeWords">
          <p className="text-2xl lg:text-4xl text-purple-400 font-bold font-serif italic text-center">
            No movies found
          </p>
        </div>
      ) : (
        <>
          <div className="py-8 px-4 max-w-[1280px] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          <div ref={ButtonRef}>
            <Pagination />
          </div>

          {scrollPage > 15 && (
            <div
              className="fixed bottom-1 left-1/2 transform -translate-x-1/2 animate-turn-up 
                         w-7 h-7 flex items-center justify-center 
                         bg-purple-400 rounded-full hover:bg-purple-500 
                         transition duration-300 cursor-pointer shadow-lg z-50"
              onClick={ScrollToTop}
            >
              <i className="fa-solid fa-angles-up text-white text-base"></i>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
