import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="app-header bg-white shadow-md py-4">
      <div className="header-container container mx-auto flex justify-between items-center px-4">
        <Link href="/">
          <div className="logo text-2xl font-bold text-blue-600 cursor-pointer">
            Think Scribble
          </div>
        </Link>

        <nav className="nav-links space-x-6 text-gray-700 font-medium">
          <Link href="/">
            <span className="nav-link hover:text-blue-500 cursor-pointer">Home</span>
          </Link>
          <Link href="/about">
            <span className="nav-link hover:text-blue-500 cursor-pointer">About</span>
          </Link>
          <Link href="/contact">
            <span className="nav-link hover:text-blue-500 cursor-pointer">Contact</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
