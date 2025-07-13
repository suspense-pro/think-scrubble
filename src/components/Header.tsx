import Link from "next/link";
import React from "react";

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  return (
    <header className="app-header">
      <div className="container header-content">
        <Link href="/">
          <div className="logo">Think Scribble</div>
        </Link>
        <div className="search-bar">
          <input
            type="search"
            placeholder="Search articles..."
            className="search-input"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearch(e.target.value)}
            aria-label="Search articles"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
