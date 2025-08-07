// src/Components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();
  const { pathname, state } = location;

  useEffect(() => {
    if (state?.preserveScroll && typeof state.scrollY === "number") {
      window.scrollTo({ top: state.scrollY });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
