// src/common/Header.jsx
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-[#E33F4B] text-white p-6 shadow-md">
      <Link to="/" className="text-3xl font-bold">
        zomato
      </Link>
      {/* <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/admin">Admin</Link>
            </li>
            <li>
              <Link to="/rest">Restaurant</Link>
            </li>
          </ul>
        </nav> */}
    </header>
  );
};

export default Header;
