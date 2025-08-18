import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { GlobalContext } from "../Components/Context";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import { Circles } from "react-loader-spinner";
import { motion } from "framer-motion";
import { AiFillStar } from "react-icons/ai";

const Details = () => {
  const {
    API_BASE_URL,
    setLoading,
    loading,
    options,
    details,
    setDetails,
    AddOrRemoveMovie,
    favorite,
    visible,
    imgVisible,
  } = useContext(GlobalContext);
  const { id } = useParams();
  const url = `${API_BASE_URL}/movie/${id}`;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const data = await fetch(url, options);
        const response = await data.json();
       

        if (!response || !response.id) {
          throw new Error("Movie details not found");
        }
        if (response) {
          setDetails(response);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, []);
  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Circles
          height={"120"}
          width={"120"}
          color="rgb(130, 50, 200)"
          visible={true}
        />
      </div>
    );
  }

  return details.poster_path && details.original_title && details.overview ? (
    <div className="relative grid lg:grid-cols-2 grid-cols-1 gap-10 text-white container mx-auto lg:p-20 ">
      {imgVisible && (
        <div className=" h-13 w-13  animate-img-movie overflow-hidden group rounded-sm  absolute  lg:right-30  lg:-translate-y-6 ">
          <img
            src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
            alt={details.title}
            className="w-full h-auto object-cover block  duration-300 "
          />
        </div>
      )}
      <div className="h-96 overflow-hidden group rounded-2xl bg-transparent lg:mt-0 mt-4">
        <img
          src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
          alt={details.title}
          className="w-full h-full object-contain block duration-300"
        />
      </div>
      {/* <div className="img-container overflow-hidden h-[200px] sm:h-[150px]  ">
        <img
          width="220"
          height="400"
          src={
            details.poster_path
              ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
              : "/src/assets/no-movie (1).png"
          }
          alt={details.title}
          className="transition w-full h-full duration-200 object-fit aspect-auto rounded-md"
        />
      </div> */}

      <div className=" flex flex-col  lg:items-start items-center gap-4 text-purple-400">
       
       <motion.div
  initial={{ y: "100%", opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ delay: 0.2, duration: 0.3 }}
  className="text-2xl lg:text-4xl max-w-[700px] mb-4 text-center lg:text-start"
>
  {details?.original_title}
</motion.div>
        
        <p>{details.overview}</p>
        <div className="flex justify-between items-center mt-4 w-full">

        <span className="flex items-center gap-1">
                    <AiFillStar size={20} className="text-yellow-400" />
                    <p className="text-sm text-purple-400 font-medium">
                      {details.vote_average ? details.vote_average.toFixed(1) : "N/A"} / 10 
                    </p>
                  </span>
        <span >
          {details.release_date} {details.original_language}
        </span>
        {details?.runtime != null ? `${Math.floor(details.runtime / 60)}h ${details.runtime % 60}m` : "Runtime unknown"}
        </div>

        <div
  className="relative flex items-center mt-1.5 hover:text-purple-600 transition duration-300 ease-in-out cursor-pointer"
  onClick={() => AddOrRemoveMovie(details)}
>
  {favorite.findIndex((item) => item.id === details.id) === -1 ? (
    <IoBookmarkOutline size={35} color="purple" />
  ) : (
    <>
      <IoBookmark size={35} color="purple" />
      <span
        className={`absolute left-full ml-2 text-purple-400 text-md rounded-lg italic tracking-wider whitespace-nowrap
          ${visible ? 'opacity-100 animate-save-movie' : 'opacity-0'}
        `}
      >
        save to collection
      </span>
    </>
  )}
</div>


        <div className="fixed left-4 top-1/2 transform -translate-y-1/2 hover:text-purple-600 transition duration-300 ease-in-out">
          <Link to={"/"}>
            <i className="fa-solid fa-chevron-left lg:text-6xl md:text-3xl sm:text-2xl"></i>
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <>
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 text-purple-500 hover:text-purple-600 transition duration-300 ease-in-out">
        <Link to={"/"}>
          <i className="fa-solid fa-chevron-left lg:text-6xl md:text-4xl sm:text-3xl "></i>
        </Link>
      </div>
      <div>
        <p className="lg:text-4xl text-xl text-purple-400 font-bold flex font-serif italic justify-center items-center h-screen placeWords">
          Oops! Something went wrong Please try again later
        </p>
      </div>
    </>
  );
};

export default Details;
