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
      {loading && (
        <div className="h-screen w-full flex justify-center items-center">
          <Circles
            height={"120"}
            width={"120"}
            color="rgb(130, 50, 200)"
            visible={true}
          />
        </div>
      )}

      <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
        {movies.length === 0 ? (
          <p className="text-7xl text-purple-400 font-bold flex font-serif italic justify-center items-center h-screen">
            No movies found
          </p>
        ) : (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        )}
      </div>

      <div ref={ButtonRef}>
        <Pagination />
      </div>

      {scrollPage > 15 && (
       <div
  className="fixed bottom-4 left-1/2 transform -translate-x-1/2 animate-turn-up 
             w-8 h-8 sm:w-10 sm:h-10 
             flex items-center justify-center 
             bg-purple-400 rounded-full hover:bg-purple-500 
             transition duration-300 cursor-pointer shadow-lg z-50"
  onClick={ScrollToTop}
>
  <i className="fa-solid fa-angles-up text-white text-xs sm:text-base"></i>
</div>


      )}
    </div>
  );
};

export default Home;
