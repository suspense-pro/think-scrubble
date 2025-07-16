"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Header: React.FC = () => {
  const router = useRouter(); // ✅ HOOKS MUST BE HERE
  const rawUser = localStorage.getItem("user");
  let user = null;

  try {
    user = rawUser ? JSON.parse(rawUser) : null;
  } catch (err) {
    console.error("Error parsing user from localStorage:", err);
    user = null;
  }

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
            <span className="nav-link hover:text-blue-500 cursor-pointer">
              Home
            </span>
          </Link>
          <Link href="/about">
            <span className="nav-link hover:text-blue-500 cursor-pointer">
              About
            </span>
          </Link>
          {user ? (
            <div>
              <span
                onClick={() => {
                  localStorage.removeItem("user");
                  router.push("/login");
                }}
                style={{ backgroundColor: "#ff554cff", color: "#fff" }}
                className="nav-link hover:text-blue-500 cursor-pointer"
              >
                Logout
              </span>
            </div>
          ) : (
            <Link href={"/login"}>
              <span className="nav-link hover:text-blue-500 cursor-pointer">
                Sign In
              </span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
