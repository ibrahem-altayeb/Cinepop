// import { createContext, useEffect, useRef, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useDebounce } from "react-use";

// import { HistoryMovies } from "../appwrite";
// import { UpdateSearchCount } from "../appwrite";

// export const GlobalContext = createContext(null);

// export default function GlobalState({ children }) {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [details, setDetails] = useState(() => {
//     const saved = localStorage.getItem("movieDetails");
//     return saved ? JSON.parse(saved) : {};
//   });
//   const [categories, setCategories] = useState([]);
//   const [activeCategoryId, setActiveCategoryId] = useState(0);
//   const [activeNav, setActiveNav] = useState(0);
//   const [showCats, setShowCats] = useState(false);
//   const [openToggle, setOpenToggle] = useState(false);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [scrollPage, setScrollPage] = useState(0);
//   const [visible, setVisible] = useState(false);
//   const [imgVisible, setImgVisible] = useState(false);
//   const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "");
//   const [favorite, setFavorite] = useState(() => {
//     const saved = localStorage.getItem("favoriteMovies");
//     return saved ? JSON.parse(saved) : [];
//   });
//   const [historyMovie , setHistoryMovie] = useState([])
//   const [debounce, setDebounce] = useState("");

//   const input = useRef(null);
//   const ButtonRef = useRef(null);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useDebounce(() => setDebounce(searchTerm), 1500, [searchTerm]);

//   const API_BASE_URL = "https://api.themoviedb.org/3";
//   const myApi = import.meta.env.VITE_API_KEY;
//   const options = {
//     method: "GET",
//     headers: {
//       accept: "application/json",
//       Authorization: `Bearer ${myApi}`,
//     },
//   };

//   const ScrollToTop = () => {
//     window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
//   };

//   const fetchMovies = async (pageNum = 1) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const apiUrl = searchTerm
//         ? `${API_BASE_URL}/search/movie?include_adult=false&language=en-US&page=${pageNum}&query=${searchTerm}`
//         : `${API_BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageNum}&sort_by=popularity.desc`;

//       const response = await fetch(apiUrl, options);
//       const json = await response.json();
//       if (!json.results || json.results.length === 0) {
//         setMovies([]);
//         setTotalPages(1);
//       } else {
//         setMovies(json.results);
//         if(searchTerm && json.results.length > 0) {
//           await UpdateSearchCount(searchTerm, json.results[0])
//         }else{
//           console.log(error); 
//         }
      
//         setError("");
//         setTotalPages(json.total_pages);
//       }
//     } catch (err) {
//       console.error("Fetch error:", err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadHistoryMovie = async () =>{
//      try{
// const movie = await HistoryMovies()
//     setHistoryMovie(movie)
//      }catch(error){
//       console.log(error);
      
//      }
//   }
//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const pageParam = parseInt(params.get("page") || "1", 10);
//     if (pageParam !== page) {
//       setPage(pageParam);
//     }
//   }, [location.search]);
// useEffect(()=>{
// loadHistoryMovie()
// }, [])
//   const updatePageInURL = (newPage) => {
//     setPage(newPage);
//     navigate(`/?page=${newPage}`);
//   };

//   const NextPage = () => {
//     if (page < totalPages) updatePageInURL(page + 1);
//   };

//   const previousPage = () => {
//     if (page > 1) updatePageInURL(page - 1);
//   };

//   const goToPage = (p) => updatePageInURL(p);

//   const ClickHome = () => {
//     fetchMovies(1);
//     setSearchTerm("");
//     setPage(1);
//     setActiveCategoryId(0);
//     navigate("/?page=1");
//   };
//   const ClickFavorite = () => {
//     setSearchTerm("");
//    setActiveCategoryId(0);
//    navigate("/favorites");
//   };
//   const fetchCategories = async () => {
//     try {
//       const urlCt = `${API_BASE_URL}/genre/movie/list?language=en`;
//       const data = await fetch(urlCt, options);
//       const response = await data.json();
//       setCategories(response.genres || []);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   const fetchMoviesByCategory = async (genreId) => {
//     try {
//       setLoading(true);
//       const urlMovies = `${API_BASE_URL}/discover/movie?with_genres=${genreId}&language=en`;
//       const data = await fetch(urlMovies, options);
//       const response = await data.json();
//       setLoading(false);
//       updatePageInURL(1);
//       setMovies(response.results);
//     } catch (error) {
//       console.error("Error fetching movies:", error);
//     }
//   };
// const updateSearchTerm = (term) => {
//   // ❗ Check BEFORE updating state
//   if (activeNav === 1) {
//     setSearchTerm(term);
//     setPage(1);
//     return;
//   }

//   // ✅ Now safe to update everything
//   setSearchTerm(term);
//   setPage(1);
//   setActiveNav(0);
//   navigate("/");
// };


//   const AddOrRemoveMovie = (movie) => {
//     const copy = [...favorite];
//     const index = copy.findIndex((item) => item.id === movie.id);

//     if (index === -1) {
//       copy.push(movie);
//       setVisible(true);
//       setImgVisible(true);
//       setTimeout(() => {
//         setVisible(false);
//         setImgVisible(false);
//       }, 1000);
//     } else {
//       copy.splice(index, 1);
//     }

//     setFavorite(copy);
//   };

//   const handleScrollPage = () => {
//     const howMuchScroll = document.body.scrollTop || document.documentElement.scrollTop;
//     const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
//     setScrollPage((howMuchScroll / height) * 100);
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScrollPage);
//     return () => window.removeEventListener("scroll", handleScrollPage);
//   }, []);

//   useEffect(() => {
//     input.current?.focus();
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("favoriteMovies", JSON.stringify(favorite));
//   }, [favorite]);

//   useEffect(() => {
//     localStorage.setItem("movieDetails", JSON.stringify(details));
//   }, [details]);

//   useEffect(() => {
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   useEffect(() => {
//     fetchMovies(page);
//   }, [debounce, page]);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   return (
//     <GlobalContext.Provider
//       value={{
//         searchTerm,
//         setSearchTerm,
//         fetchMovies,
//         movies,
//         setLoading,
//         loading,
//         API_BASE_URL,
//         myApi,
//         options,
//         details,
//         setDetails,
//         AddOrRemoveMovie,
//         favorite,
//         input,
//         ScrollToTop,
//         ButtonRef,
//         page,
//         totalPages,
//         NextPage,
//         previousPage,
//         goToPage,
//         scrollPage,
//         visible,
//         imgVisible,
//         theme,
//         setTheme,
//         setPage,
//         ClickHome,
//         updateSearchTerm,
//         categories,
//         setCategories,
//         showCats,
//         setShowCats,
//         fetchCategories,
//         fetchMoviesByCategory,
//         activeCategoryId,
//         setActiveCategoryId,
//         activeNav,
//         setActiveNav,
//         ClickFavorite,
//         openToggle,
//         setOpenToggle,
//         historyMovie
//       }}
//     >
//       {children}
//     </GlobalContext.Provider>
//   );
// }
import { createContext, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDebounce } from "react-use";
import {
  loginAnonymously,
  HistoryMovies,
  UpdateSearchCount,
} from "../appwrite";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debounce, setDebounce] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [details, setDetails] = useState(() => {
    const saved = localStorage.getItem("movieDetails");
    return saved ? JSON.parse(saved) : {};
  });
  const [categories, setCategories] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState(0);
  const [activeNav, setActiveNav] = useState(0);
  const [showCats, setShowCats] = useState(false);
  const [openToggle, setOpenToggle] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [scrollPage, setScrollPage] = useState(0);
  const [visible, setVisible] = useState(false);
  const [imgVisible, setImgVisible] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "");
  const [favorite, setFavorite] = useState(() => {
    const saved = localStorage.getItem("favoriteMovies");
    return saved ? JSON.parse(saved) : [];
  });
  const [historyMovie, setHistoryMovie] = useState([]);

  const input = useRef(null);
  const ButtonRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useDebounce(() => {
    setDebounce(searchTerm);
  }, 1500, [searchTerm]);

  const API_BASE_URL = "https://api.themoviedb.org/3";
  const myApi = import.meta.env.VITE_API_KEY;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${myApi}`,
    },
  };

  const ScrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const fetchMovies = async (pageNum = 1) => {
    try {
      setLoading(true);
      setError(null);

      const apiUrl = searchTerm
        ? `${API_BASE_URL}/search/movie?include_adult=false&language=en-US&page=${pageNum}&query=${searchTerm}`
        : `${API_BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageNum}&sort_by=popularity.desc`;

      const response = await fetch(apiUrl, options);
      const json = await response.json();

      if (!json.results || json.results.length === 0) {
        setMovies([]);
        setTotalPages(1);
      } else {
        setMovies(json.results);
        setTotalPages(json.total_pages);

        // ✅ Log history only if search
        if (searchTerm && json.results.length > 0) {
          await UpdateSearchCount(searchTerm, json.results[0]);
          await loadHistoryMovie(); // Refresh history
        }
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadHistoryMovie = async () => {
    try {
      const history = await HistoryMovies();
      console.log("✅ Loaded history:", history);
      setHistoryMovie(history);
    } catch (err) {
      console.error("Error loading history:", err);
    }
  };

  useEffect(() => {
    const init = async () => {
      await loginAnonymously();
      await loadHistoryMovie();
    };
    init();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pageParam = parseInt(params.get("page") || "1", 10);
    if (pageParam !== page) setPage(pageParam);
  }, [location.search]);

  useEffect(() => {
    fetchMovies(page);
  }, [debounce, page]);

  const updatePageInURL = (newPage) => {
    setPage(newPage);
    navigate(`/?page=${newPage}`);
  };

  const NextPage = () => {
    if (page < totalPages) updatePageInURL(page + 1);
  };

  const previousPage = () => {
    if (page > 1) updatePageInURL(page - 1);
  };

  const goToPage = (p) => updatePageInURL(p);

  const ClickHome = () => {
    fetchMovies(1);
    setSearchTerm("");
    setPage(1);
    setActiveCategoryId(0);
    navigate("/?page=1");
  };

  const ClickFavorite = () => {
    setSearchTerm("");
    setActiveCategoryId(0);
    navigate("/favorites");
  };

  const fetchCategories = async () => {
    try {
      const urlCt = `${API_BASE_URL}/genre/movie/list?language=en`;
      const data = await fetch(urlCt, options);
      const response = await data.json();
      setCategories(response.genres || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchMoviesByCategory = async (genreId) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/discover/movie?with_genres=${genreId}&language=en`, options);
      const json = await res.json();
      updatePageInURL(1);
      setMovies(json.results);
    } catch (err) {
      console.error("Category fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateSearchTerm = (term) => {
    if (activeNav === 1) {
      setSearchTerm(term);
      setPage(1);
      return;
    }
    setSearchTerm(term);
    setPage(1);
    setActiveNav(0);
    navigate("/");
  };

  const AddOrRemoveMovie = (movie) => {
    const copy = [...favorite];
    const index = copy.findIndex((item) => item.id === movie.id);
    if (index === -1) {
      copy.push(movie);
      setVisible(true);
      setImgVisible(true);
      setTimeout(() => {
        setVisible(false);
        setImgVisible(false);
      }, 1000);
    } else {
      copy.splice(index, 1);
    }
    setFavorite(copy);
  };

  const handleScrollPage = () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    setScrollPage((scrollY / height) * 100);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollPage);
    return () => window.removeEventListener("scroll", handleScrollPage);
  }, []);

  useEffect(() => {
    input.current?.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem("favoriteMovies", JSON.stringify(favorite));
  }, [favorite]);

  useEffect(() => {
    localStorage.setItem("movieDetails", JSON.stringify(details));
  }, [details]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <GlobalContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        fetchMovies,
        movies,
        loading,
        error,
        details,
        setDetails,
        AddOrRemoveMovie,
        favorite,
        page,
        totalPages,
        NextPage,
        previousPage,
        goToPage,
        ScrollToTop,
        updateSearchTerm,
        categories,
        setCategories,
        activeCategoryId,
        setActiveCategoryId,
        activeNav,
        setActiveNav,
        ClickFavorite,
        ClickHome,
        fetchMoviesByCategory,
        showCats,
        setShowCats,
        openToggle,
        setOpenToggle,
        historyMovie,
        theme,
        setTheme,
        imgVisible,
        visible,
        input,
        ButtonRef,
        scrollPage,
        page,
setPage,  
totalPages,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
