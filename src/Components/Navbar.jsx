import { useContext } from "react";
import { GlobalContext } from "./Context";
import { NavLink } from "react-router-dom";
import { LuSun, LuMoon } from "react-icons/lu";
import Categories from "../Pages/Categories";
import { IoMenuOutline, IoHomeOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { BsBookmarkHeartFill } from "react-icons/bs";
import { FaSortDown } from "react-icons/fa";

const NavLinks = ({ isMobile = false, onLinkClick }) => {
  const {
    searchTerm,
    input,
    setTheme,
    ClickHome,
    updateSearchTerm,
    openToggle,
    setOpenToggle,
    setActiveNav,
    activeNav, // Added activeNav
    ScrollToTop, // Added ScrollToTop
  } = useContext(GlobalContext);

  const handleClick = (index, shouldClose = true) => {
    setActiveNav(index);
    if (onLinkClick && shouldClose) {
      onLinkClick();
    }
  };

  const commonClasses = "flex items-center gap-2 font-bold px-3 py-2 rounded";

  return (
    <ul
      className={`flex ${
        isMobile
          ? "flex-col gap-5 mb-10 text-purple-400"
          : "items-center gap-5 text-purple-400"
      }`}
    >
      <NavLink to="/" onClick={ClickHome}>
        <li
          onClick={() => handleClick(0)}
          className={`${commonClasses} ${
            activeNav === 0
              ? "bg-purple-100 text-purple-700"
              : "text-purple-400 hover:text-purple-700"
          }`}
        >
          {isMobile && <IoHomeOutline className="text-xl" />}
          Home
        </li>
      </NavLink>

      <li
        onClick={() => handleClick(1, false)}
        className={`${commonClasses} ${
          activeNav === 1
            ? "bg-purple-100 text-purple-700"
            : "text-purple-400 hover:text-purple-700"
        }`}
      >
        {isMobile && <FaSortDown className="text-xl" />}
        <Categories
          onSelect={(category) => {
            handleClick(1, true);
            ScrollToTop();
          }}
        />
      </li>

      <NavLink to="/favorites">
        <li
          onClick={() => handleClick(2)}
          className={`${commonClasses} ${
            activeNav === 2
              ? "bg-purple-100 text-purple-700"
              : "text-purple-400 hover:text-purple-700"
          }`}
        >
          {isMobile && <BsBookmarkHeartFill className="text-xl" />}
          Favorites
        </li>
      </NavLink>
    </ul>
  );
};

const Navbar = () => {
  const {
    searchTerm,
    input,
    setTheme,
    ClickHome,
    updateSearchTerm,
    openToggle,
    setOpenToggle,
    setActiveNav, // Added setActiveNav here
  } = useContext(GlobalContext);

  return (
    <div className="w-full shadow-sm">
      <div className="container mx-auto flex items-center justify-between p-4 lg:flex-row flex-col lg:gap-5">
        <div className="flex items-center justify-between w-full lg:w-auto">
          <h1 className="text-2xl lg:text-3xl font-extrabold text-purple-400 dark:text-purple-500 italic">
            <NavLink
              to="/"
              onClick={() => {
                ClickHome();
                setActiveNav(0);
              }}
            >
              Cine<span className="text-purple-600">pop</span>
            </NavLink>
          </h1>
          <button
            className="lg:hidden text-purple-500 text-3xl"
            onClick={() => setOpenToggle(!openToggle)}
          >
            {openToggle ? <RxCross1 /> : <IoMenuOutline />}
          </button>
        </div>

        <div className="mt-3 lg:mt-0 w-full lg:w-auto flex justify-center">
          <input
            ref={input}
            type="text"
            value={searchTerm}
            onChange={(e) => updateSearchTerm(e.target.value)}
            placeholder="Search for movies..."
            className="w-full lg:w-96 p-2 border border-purple-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 tracking-wider placeholder:text-purple-400 text-purple-800"
          />
        </div>

        <div className="hidden lg:flex items-center gap-5 font-bold">
          <NavLinks />
          <div className="flex items-center gap-2 ml-4">
            <button
              onClick={() => setTheme("")}
              className="text-purple-500 hover:text-purple-700 dark:text-zinc-400 dark:hover:text-white transition-colors duration-200"
            >
              <LuSun />
            </button>
            <button
              onClick={() => setTheme("dark")}
              className="text-purple-500 hover:text-purple-700 dark:text-zinc-400 dark:hover:text-white transition-colors duration-200"
            >
              <LuMoon />
            </button>
          </div>
        </div>
      </div>

      <div
        className={`lg:hidden fixed top-0 left-0 h-full w-64 bg-white dark:bg-zinc-800 z-50 shadow-lg transform transition-transform duration-300 ${
          openToggle ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col justify-between h-full p-5 pt-10">
          <div>
            <h1 className="text-2xl font-extrabold text-purple-400 dark:text-purple-500 italic mb-5">
              <NavLink
                to="/"
                onClick={() => {
                  ClickHome();
                  setActiveNav(0);
                }}
              >
                Cine<span className="text-purple-600">pop</span>
              </NavLink>
            </h1>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <NavLinks
              isMobile={true}
              onLinkClick={() => setOpenToggle(false)}
            />
          </div>

          <div className="flex gap-3">
            <button
              // onClick={toggleTheme}
              className="text-purple-500 hover:text-purple-700 dark:text-zinc-400 dark:hover:text-white transition-colors duration-200"
            >
              {/* Theme toggle icon or text can go here */}
            </button>

            <button
              // onClick={toggleTheme}
              className="text-purple-500 hover:text-purple-700 dark:text-zinc-400 dark:hover:text-white transition-colors duration-200"
            >
              Theme
            </button>
          </div>
        </div>
      </div>

      {openToggle && (
        <div
          className="fixed inset-0 bg-opacity-30 z-40 lg:hidden"
          onClick={() => setOpenToggle(false)}
        ></div>
      )}
    </div>
  );
};

export default Navbar;
