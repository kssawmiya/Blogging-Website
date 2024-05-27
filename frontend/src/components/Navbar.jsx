import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { useContext, useState } from "react";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  // console.log(prompt);
  const path = useLocation().pathname;
  // console.log(path);
  const showMenu = () => {
    setMenu(!menu);
  };
  const { user } = useContext(UserContext);

  return (
    <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
      {/* logo of the nav bar */}
      <div className="flex gap-1 items-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkl_wYIsWhMjhEE70-HJ5VNwqYfZJDWiKdnLwvzWC9NQ&s"
          alt="logo"
          className="h-14 w-14"
        />
        <h1 className="md:text-xl font-extrabold text-blue-900 font-serif text-2xl">
          <Link to="/">Fit Mind</Link>
        </h1>
      </div>

      {/* Search Bar */}
      {path === "/" && (
        <div className="flex items-center space-x-0 border-2 border-blue-800 rounded-lg w-2/4">
          <p
            onClick={() =>
              navigate(prompt ? "?search=" + prompt : navigate("/"))
            }
            className="cursor-pointer pl-3 "
          >
            <BsSearch />
          </p>
          <input
            onChange={(e) => setPrompt(e.target.value)}
            type="text"
            placeholder="Search a post"
            className="px-3 pl-[200px] text-blue-800 outline-none"
          />
        </div>
      )}

      <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
        {user ? (
          <button className="px-10 py-2 bg-blue-800 rounded-lg text-white font-semibold hover:text-black">
            <Link to="/write">Create</Link>
          </button>
        ) : (
          <button className="px-10 py-2 bg-blue-600 rounded-lg text-white font-semibold hover:text-black">
            <Link to="/login">Login</Link>
          </button>
        )}
        {user ? (
          <div onClick={showMenu}>
            <p className="cursor-pointer relative">
              <FaBars />
            </p>
            {menu && <Menu />}
          </div>
        ) : (
          <button className="px-10 py-2 bg-blue-800 rounded-lg text-white font-semibold hover:text-black">
            <Link to="/register">Register</Link>
          </button>
        )}
      </div>
      <div onClick={showMenu} className="md:hidden text-lg">
        <p className="cursor-pointer relative">
          <FaBars />
        </p>
        {menu && <Menu />}
      </div>
    </div>
  );
};

export default Navbar;
