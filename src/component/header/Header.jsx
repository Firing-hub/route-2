import React, { useContext, useEffect, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import "./style.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext.jsx";
import userFallbackImage from "../../assets/userImage.jpg";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.js";

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [show, setshow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const user = useContext(AuthContext);

  console.log(user);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleSearchBar = () => {
    setShowSearch((prev) => !prev);
    setShowMobileMenu(false);
  };

  const handleMobileMenu = () => {
    setShowMobileMenu((prev) => !prev);
    setShowSearch(false);
  };

  const handleHeader = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 80) {
      if (currentScrollY > lastScrollY) {
        setshow("hide");
      } else {
        setshow("show");
      }
      setLastScrollY(currentScrollY);
    } else {
      setshow("top");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleHeader);

    return () => {
      window.removeEventListener("scroll", handleHeader);
    };
  }, [lastScrollY]);

  return (
    <div className={`header ${showMobileMenu ? "showMobileMenu" : ""} ${show}`}>
      <div className="logo" onClick={() => navigate("/")}>
        <span>ShortestPathFinder</span>
      </div>
      <div className="searchInput">
        <input
          type="text"
          placeholder="Search for nearest distance"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        {query && <IoClose onClick={() => setQuery("")} />}
      </div>
      <ul className="menuItems">
        <li className="menuItem" onClick={() => navigate("/cart")}>
          Cart
        </li>
        <li className="menuItem" onClick={() => navigate("/contact")}>
          Contact Us
        </li>
        <li className="menuItem" onClick={() => navigate("/legal")}>
          Legal
        </li>
        {user ? (
          <li
            className="menuItem logDetail"
            onClick={() => {
              signOut(auth);
              navigate("/register");
            }}
          >
            Logout
          </li>
        ) : (
          <li
            className="menuItem logDetail"
            onClick={() => navigate("/register")}
          >
            Login
          </li>
        )}
        {user && (
          <li className="menuItem userImage">
            <img src={user?.photoURL || userFallbackImage} alt="" />
          </li>
        )}
      </ul>
      <div className="mobileMenuItems">
        <IoSearch onClick={handleSearchBar} />
        {showMobileMenu ? (
          <IoClose onClick={handleMobileMenu} />
        ) : (
          <IoMdMenu onClick={handleMobileMenu} />
        )}
        {user && (
          <div className="userImage">
            <img src={user?.photoURL || userFallbackImage} alt="" />
          </div>
        )}
      </div>

      {showSearch && (
        <div className="searchBar">
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for nearest distance"
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            <IoClose onClick={handleSearchBar} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
