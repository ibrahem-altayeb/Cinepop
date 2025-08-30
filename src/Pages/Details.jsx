import { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GlobalContext } from "../Components/Context";
import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import { Circles } from "react-loader-spinner";
import { motion } from "framer-motion";
import { AiFillStar } from "react-icons/ai";
import { FaClock, FaCalendarAlt } from "react-icons/fa";

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

  const  {id}  = useParams();
 
  

  const url = `${API_BASE_URL}/movie/${id}`;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(url, options);
        const data = await res.json();
        if (!data || !data.id) throw new Error("Movie details not found");
        setDetails(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const BackButton = () => (
    <div
      className="fixed left-4 top-1/2 transform -translate-y-1/2 text-purple-500 hover:text-purple-600 transition duration-300 ease-in-out cursor-pointer"
      onClick={() => navigate(-1)}
    >
      <i className="fa-solid fa-chevron-left lg:text-6xl md:text-4xl sm:text-3xl"></i>
    </div>
  );

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Circles height={"120"} width={"120"} color="rgb(130, 50, 200)" visible={true} />
      </div>
    );
  }

  if (!details.poster_path || !details.original_title || !details.overview) {
    return (
      <>
        <BackButton />
        <div>
          <p className="lg:text-4xl text-xl text-purple-400 font-bold flex font-serif italic justify-center items-center h-screen">
            Oops! Something went wrong. Please try again later.
          </p>
        </div>
      </>
    );
  }

  return (
    <div className="relative grid lg:grid-cols-2 grid-cols-1 gap-10 text-white container mx-auto lg:p-20">
      {imgVisible && (
  <div className="hidden xl:flex h-13 w-13 animate-img-movie overflow-hidden group rounded-sm absolute lg:right-60 lg:-translate-y-6">
    <img
      src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
      alt={details.title}
      className="w-full h-auto object-cover block duration-300"
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

      <div className="flex flex-col lg:items-start items-center gap-4 text-purple-400">
        <div className="flex justify-between items-start w-full gap-4">
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="w-full text-2xl lg:text-3xl mb-4 text-start"
          >
            {details.original_title}
          </motion.div>

          <span className="flex items-center gap-1 whitespace-nowrap">
            <AiFillStar size={20} className="text-yellow-400" />
            <p className="text-sm text-purple-400 font-medium">
              {details.vote_average ? details.vote_average.toFixed(1) : "N/A"} / 10
            </p>
          </span>
        </div>

        <p>{details.overview}</p>

        <div className="flex justify-between items-center flex-wrap gap-4 mt-3 w-full text-purple-500 font-medium text-xs sm:text-sm lg:text-base whitespace-nowrap">
          <p className="flex items-center gap-1 shrink-0">
            {details.genres?.[0]?.name || "Unknown Genre"}
          </p>
          <div className="flex items-center gap-1 shrink-0">
            <FaClock className="text-purple-600 text-sm" />
            <p>
              {details.runtime != null
                ? `${Math.floor(details.runtime / 60)}h ${details.runtime % 60}m`
                : "Runtime unknown"}
            </p>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <FaCalendarAlt className="text-purple-600 text-sm" />
            <p>{details.release_date || "Unknown Date"}</p>
          </div>
          <span className="text-purple-400 text-sm shrink-0">|</span>
          <p className="uppercase shrink-0">{details.original_language || "N/A"}</p>
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
                className={`absolute left-full ml-2 text-purple-400 text-md rounded-lg italic tracking-wider whitespace-nowrap ${
                  visible ? "opacity-100 animate-save-movie" : "opacity-0"
                }`}
              >
                save to collection
              </span>
            </>
          )}
        </div>

        <BackButton />
      </div>
    </div>
  );
};

export default Details;
