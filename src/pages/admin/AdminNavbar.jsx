import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi"; // For mobile menu toggle icons

export default function AdminNavbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // For mobile menu toggle
  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleNavigate = (path) => {
    navigate(path);
    setDropdownOpen(false);
    setMenuOpen(false); // Close menu on navigation
  };

  return (
    <nav className="bg-gray-500 text-white shadow-lg">
      <div className="flex justify-between items-center px-4 py-3">
        {/* Logo or Title */}
        <h1 className="text-xl md:text-3xl font-bold">Admin Dashboard</h1>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden w-10 h-10 rounded bg-gray-600 flex items-center justify-center text-white text-lg hover:bg-gray-800"
        >
          {menuOpen ? (
            <HiX className="w-6 h-6" />
          ) : (
            <HiMenu className="w-6 h-6" />
          )}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {/* User Icon */}
          <button
            onClick={toggleDropdown}
            className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white text-lg hover:bg-gray-800"
          >
            <FaUserCircle className="w-6 h-6" />
          </button>

          {/* User Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-6 top-16 mt-2 w-40 bg-white border rounded shadow-lg text-gray-800 z-10">
              <ul>
                <li
                  onClick={() => handleNavigate("/admin/password")}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Change Password
                </li>
              </ul>
              <ul>
                <li
                  onClick={""}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Logout
                </li>
              </ul>
              <ul>
                <li
                  onClick={() => navigate("/admin/news")}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Add news
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-500 text-white">
          <ul className="space-y-2 px-4 py-2">
            <li>
              <a
                href=""
                className="block text-lg hover:underline hover:text-gray-300"
                onClick={""}
              >
                Logout
              </a>
            </li>
            <li>
              <a
                href=""
                className="block text-lg hover:underline hover:text-gray-300"
                onClick={""}
              >
                Change Password
              </a>
            </li>
            <li>
              <a
                href=""
                className="block text-lg hover:underline hover:text-gray-300"
                onClick={""}
              >
                Add news
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
