import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

export default function AdminNavbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const handleNavigate = (path) => {
    navigate(path)
    setDropdownOpen(false); 
  };
  const navigate = useNavigate();
  return (
    <nav className="flex flex-wrap justify-between items-center px-6 py-4 bg-gray-400 text-white">
      <h1 className="text-2xl md:text-4xl font-bold flex-1 mb-4 md:mb-0">
        Admin Dashboard
      </h1>
      {/* <div className="w-full md:w-auto flex justify-center mb-4 md:mb-0 md:flex-grow">
        <a href="/admin/banner" className="text-lg md:text-xl hover:underline">
          Banner
        </a>
      </div> */}
      <button
        onClick={toggleDropdown}
        className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white text-lg hover:bg-gray-800"
      >
        <FaUserCircle className="w-6 h-6" />
      </button>
      {dropdownOpen && (
        <div className="absolute right-6 top-12 mt-2 w-40 bg-white border rounded shadow-lg text-gray-800">
          <ul>
            <li
              onClick={() => handleNavigate("/admin/password")}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              Change Password
            </li>
            <li
              onClick={() => handleNavigate("/logout")}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
