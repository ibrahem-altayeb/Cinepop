import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Favorites from "./Pages/Favorites";
import Details from "./Pages/Details";
import Navbar from "./Components/Navbar";
import { useContext } from "react";
import { GlobalContext } from "./Components/Context";
import "./scrollbar.css";
import ScrollToTop from "./Components/ScrollToTop";

const App = () => {
  const { theme } = useContext(GlobalContext);

  return (
    <div
      className={`${
        theme ? "dark " : ""
      } max-w-screen min-h-[150vh] mx-auto text-lg p-6 bg-white dark:bg-zinc-900`}
    >
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Favorites" element={<Favorites />} />
        <Route path="/movie/:id" element={<Details />} />
      </Routes>
    </div>
  );
};

export default App;
