import { createContext, useEffect, useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "react-use";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [details, setDetails] = useState([]);
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
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "";
  });
 
  const [favorite, setFavorite] = useState(() => {
    const saved = localStorage.getItem("favoriteMovies");
    return saved ? JSON.parse(saved) : [];
  });
  const [debounce, setDebounce] = useState("");
  const input = useRef(null);
  const ButtonRef = useRef(null);
  useDebounce(() => setDebounce(searchTerm), 1500, [searchTerm]);

  const search = useNavigate();
  const API_BASE_URL = "https://api.themoviedb.org/3";
  const myApi = import.meta.env.VITE_API_KEY;

  const url = searchTerm
    ? `${API_BASE_URL}/search/movie?include_adult=false&language=en-US&page=${page}&query=${searchTerm}`
    : `${API_BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${myApi}`,
    },
  };

  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url, options);
      const json = await response.json();

      if (!json.results || json.results.length === 0) {
        setMovies([]);
        setTotalPages(1);
      } else {
        setMovies(json.results);
        setError("");
        setTotalPages(json.total_pages);
        search("/");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  function ClickHome() {
    fetchMovies();
    setSearchTerm("");
    setPage(1);
    setActiveCategoryId(0);
  }

 const fetchCategories = async () => {
  const urlCt = `${API_BASE_URL}/genre/movie/list?language=en`;
  try {
    const data = await fetch(urlCt, options);
    if (!data.ok) {
      // Handle HTTP errors like 401 here
      const errorResponse = await data.json();
      console.error("API error:", errorResponse.status_message);
      setCategories([]); // Or keep previous state
      return;
    }
    const response = await data.json();
    setCategories(response.genres || []);
  } catch (error) {
    console.error("Error fetching categories:", error);
    setCategories([]); // fallback to empty array
  }
};
console.log("TMDB token:", myApi);

  const fetchMoviesByCategory = async (genreId) => {
    const urlMovies = `${API_BASE_URL}/discover/movie?with_genres=${genreId}&language=en`;
    try {
      setLoading(true);
      const data = await fetch(urlMovies, options);
      const response = await data.json();
      setLoading(false);
      setPage(1);
      search("/");
      setMovies(response.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  function updateSearchTerm(term) {
    setSearchTerm(term);
    setPage(1);
  }

  function AddOrRemoveMovie(getCurrentMovie) {
    const copy = [...favorite];
    const index = copy.findIndex((item) => item.id === getCurrentMovie.id);

    if (index === -1) {
      copy.push(getCurrentMovie);
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
  }

  function handleScrollPage() {
    const howMuchScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    setScrollPage((howMuchScroll / height) * 100);
  }

  function NextPage() {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
      ScrollToTop();
    }
  }

  function previousPage() {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
      ScrollToTop();
    }
  }

  function goToPage(p) {
    setPage(p);
    ScrollToTop();
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScrollPage);
    return () => {
      window.removeEventListener("scroll", handleScrollPage);
    };
  }, []);

  useEffect(() => {
    input.current?.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem("favoriteMovies", JSON.stringify(favorite));
  }, [favorite]);

  useEffect(() => {
    fetchMovies();
  }, [debounce, page]);

  useEffect(() => {
    fetchCategories();
  }, []);
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
        setLoading,
        loading,

        API_BASE_URL,
        myApi,
        options,
        details,
        setDetails,
        AddOrRemoveMovie,
        favorite,
        input,
        ScrollToTop,
        ButtonRef,
        page,
        totalPages,
        NextPage,
        previousPage,
        goToPage,
        scrollPage,
        visible,
        imgVisible,
        theme,
        setTheme,
        setPage,
        ClickHome,
        updateSearchTerm,
        categories,
        setCategories,
        showCats,
        setShowCats,
        fetchCategories,
        fetchMoviesByCategory,
        activeCategoryId,
        setActiveCategoryId,
        activeNav,
        setActiveNav,
        openToggle,
        setOpenToggle,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
