import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-black text-white p-6 overflow-hidden ">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="text-3xl font-extrabold">
          <a href="">KGMOA</a>
        </div>

        {/* Hamburger Menu Button */}
        <button
          className="block md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex">
          <ul className="flex space-x-6">
            <li>
              <a href="/" className="font-bold">
                Home
              </a>
            </li>
            <li>
              <a href="/conference" className="font-bold">
                Conference 2025
              </a>
            </li>
            <li>
              <a href="#contact" className="font-bold">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#about" className="font-bold">
                About Us
              </a>
            </li>
            <li>
              <a href="/register" className="font-bold">
                Register
              </a>
            </li>
            <li>
              <a href="/admin" className="font-bold">
                Admin
              </a>
            </li>
            <li>
              <a href="/volunteer/login" className="font-bold">
                Volunteer
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4">
          <ul className="space-y-4">
            <li>
              <a href="/" className="font-bold block">
                Home
              </a>
            </li>
            <li>
              <a href="/conference" className="font-bold block">
                Conference 2025
              </a>
            </li>
            <li>
              <a href="#contact" className="font-bold block">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#about" className="font-bold block">
                About Us
              </a>
            </li>
            <li>
              <a href="/register" className="font-bold">
                Register
              </a>
            </li>
            <li>
              <a href="/volunteer/scan" className="font-bold block">
                Admin
              </a>
            </li>
            <li>
              <a href="/volunteer/login" className="font-bold">
                Volunteer
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
