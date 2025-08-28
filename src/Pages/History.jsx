import { Link } from "react-router-dom";
import { GlobalContext } from "../Components/Context";
import { useContext, useRef } from "react";
import { Circles } from "react-loader-spinner"; 

const History = () => {
  const { historyMovie, loading } = useContext(GlobalContext);
console.log(historyMovie);

  const scrollRef = useRef(null);
  const scrollAmount = 250;

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full">
      {loading ? (
        <div className="h-screen w-full flex justify-center items-center">
          <Circles
            height={"120"}
            width={"120"}
            color="rgb(130, 50, 200)"
            visible={true}
          />
        </div>
      ) : historyMovie.length === 0 ? (
        <div className="flex justify-center items-center h-screen px-4 placeWords">
          <p className="text-2xl lg:text-4xl text-purple-400 font-bold font-serif italic text-center">
            You haven't searched for any movies yet.
          </p>
        </div>
      ) : (
        <>
         
          <button
            onClick={scrollLeft}
            className="absolute left-[-24px] lg:left-0 top-1/2 -translate-y-1/2 z-10 px-3 py-2 rounded-full shadow-md text-purple-500 hover:text-purple-600 transition duration-300 ease-in-out cursor-pointer"
          >
            <i className="fa-solid fa-chevron-left lg:text-6xl text-5xl"></i>
          </button>

         
          <section className="history">
         <h2
  className="mt-3 whitespace-nowrap font-[Bebas Neue] italic tracking-wider text-transparent text-sm lg:text-4xl
             truncate transition"
>
  <span className="dark:hidden" style={{ WebkitTextStroke: "1px black" }}>
    Recently, you searched for these movies:
  </span>
  <span className="hidden dark:inline" style={{ WebkitTextStroke: "1px white" }}>
    Recently, you searched for these movies: 
  </span>
</h2>



            <ul ref={scrollRef}>
              {historyMovie.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                 
              <img
  src={
    movie.poster_url
      ? `https://image.tmdb.org/t/p/w500${movie.poster_url}` // if poster_url exists
      : "/no-movie.png" // fallback image
  }
  alt={movie.title || "Movie poster"}
  className="w-full h-full object-cover transition duration-300"
/>


                  
                </li>
              ))}
            </ul>
          </section>

          
          <button
            onClick={scrollRight}
            className="absolute right-[-24px] lg:right-0 top-1/2 -translate-y-1/2 z-10 px-3 py-2 rounded-full shadow-md text-purple-500 hover:text-purple-600 transition duration-300 ease-in-out cursor-pointer"
          >
            <i className="fa-solid fa-chevron-right lg:text-6xl text-5xl"></i>
          </button>
        </>
      )}
    </div>
  );
};

export default History;
