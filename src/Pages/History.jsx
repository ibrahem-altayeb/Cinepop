// import { GlobalContext } from "../Components/Context";
// import { useContext, useRef } from "react";
// import { Circles } from "react-loader-spinner";

// const History = () => {
//   const { historyMovie, loading } = useContext(GlobalContext);
//   const scrollRef = useRef(null);
//   const scrollAmount = 250;

//   const scrollLeft = () => {
//     scrollRef.current?.scrollBy({ left: -scrollAmount, behavior: "smooth" });
//   };

//   const scrollRight = () => {
//     scrollRef.current?.scrollBy({ left: scrollAmount, behavior: "smooth" });
//   };

//   return (
//     <div className="relative w-full">
//       {loading ? (
//         <div className="h-screen w-full flex justify-center items-center">
//           <Circles height={120} width={120} color="rgb(130, 50, 200)" visible={true} />
//         </div>
//       ) : historyMovie.length === 0 ? (
//         <div className="flex justify-center items-center h-screen px-4 placeWords">
//           <p className="text-2xl lg:text-4xl text-purple-400 font-bold font-serif italic text-center">
//             You haven't searched for any movies yet.
//           </p>
//         </div>
//       ) : (
//         <>
//           <button
//             onClick={scrollLeft}
//             className="absolute left-[-24px] lg:left-0 top-1/2 -translate-y-1/2 z-10 px-3 py-2 rounded-full shadow-md text-purple-500 hover:text-purple-600 transition duration-300 ease-in-out cursor-pointer"
//           >
//             <i className="fa-solid fa-chevron-left lg:text-6xl text-5xl"></i>
//           </button>

//           <section className="history">
//             <h2 className="mt-3 whitespace-nowrap font-[Bebas Neue] italic tracking-wider text-transparent text-sm lg:text-4xl truncate transition">
//               <span className="dark:hidden" style={{ WebkitTextStroke: "1px black" }}>
//                 Recently, you searched for these movies:
//               </span>
//               <span className="hidden dark:inline" style={{ WebkitTextStroke: "1px white" }}>
//                 Recently, you searched for these movies:
//               </span>
//             </h2>

//             <ul ref={scrollRef} className="flex gap-4 overflow-x-auto p-4">
//               {historyMovie.map((movie, index) => (
//                 <li key={movie.$id} className="flex-shrink-0 w-36">
//                   <p className="text-sm text-center mb-1 font-semibold text-purple-500">
//                     {index + 1}
//                   </p>
//                   <img
//                     src={movie.poster_url || "/no-movie.png"}
//                     alt={movie.searchTerm || "Movie"}
//                     className="w-full h-auto rounded-lg shadow-lg object-cover transition duration-300"
//                   />
//                 </li>
//               ))}
//             </ul>
//           </section>

//           <button
//             onClick={scrollRight}
//             className="absolute right-[-24px] lg:right-0 top-1/2 -translate-y-1/2 z-10 px-3 py-2 rounded-full shadow-md text-purple-500 hover:text-purple-600 transition duration-300 ease-in-out cursor-pointer"
//           >
//             <i className="fa-solid fa-chevron-right lg:text-6xl text-5xl"></i>
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// export default History;


// src/Pages/History.jsx
import { useContext, useRef } from "react";
import { GlobalContext } from "../Components/Context";
import { Circles } from "react-loader-spinner";

export default function History() {
  const { historyMovie, loading } = useContext(GlobalContext);
  const scrollRef = useRef(null);
  const scrollAmount = 250;

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <div className="relative w-full">
      {loading ? (
        <div className="h-screen w-full flex justify-center items-center">
          <Circles height={120} width={120} color="rgb(130, 50, 200)" visible={true} />
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
            <h2 className="mt-3 whitespace-nowrap font-[Bebas Neue] italic tracking-wider text-transparent text-sm lg:text-4xl truncate transition">
              <span className="dark:hidden" style={{ WebkitTextStroke: "1px black" }}>
                Recently, you searched for these movies:
              </span>
              <span className="hidden dark:inline" style={{ WebkitTextStroke: "1px white" }}>
                Recently, you searched for these movies:
              </span>
            </h2>

            <ul ref={scrollRef} className="flex gap-4 overflow-x-auto p-4">
              {historyMovie.map((movie, index) => (
                <li key={movie.$id} className="flex-shrink-0 w-36">
                  <p className="text-sm text-center mb-1 font-semibold text-purple-500">
                    {index + 1}
                  </p>
                  <img
                    src={movie.poster_url || "/no-movie.png"}
                    alt={movie.searchTerm || "Movie"}
                    className="w-full h-auto rounded-lg shadow-lg object-cover transition duration-300"
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
}
