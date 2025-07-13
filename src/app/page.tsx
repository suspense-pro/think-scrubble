"use client";

import React, { useState, useCallback, useEffect } from "react";
import { dummyData, Blog } from "../lib/data";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BlogCard from "../components/BlogCard";

const HomePage = () => {
  const [allBlogs, setAllBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    // Simulating async data fetch
    const fetchData = async () => {
      const blogs = dummyData.blogs;
      setAllBlogs(blogs);
      setFilteredBlogs(blogs);
    };
    fetchData();
  }, []);

  const handleSearch = useCallback(
    (query: string) => {
      const lowerCaseQuery = query.toLowerCase();
      if (!lowerCaseQuery) {
        setFilteredBlogs(allBlogs);
      } else {
        const results = allBlogs.filter(
          (blog) =>
            blog.title.toLowerCase().includes(lowerCaseQuery) ||
            blog.category.toLowerCase().includes(lowerCaseQuery) ||
            blog.author.toLowerCase().includes(lowerCaseQuery) ||
            blog.tags.some((tag) => tag.toLowerCase().includes(lowerCaseQuery))
        );
        setFilteredBlogs(results);
      }
    },
    [allBlogs]
  );

  const trendingBlogs = filteredBlogs.filter((blog) => blog.isTrending);

  return (
    <>
      <Header onSearch={handleSearch} />
      <main className="main-content">
        <div className="container">
          {trendingBlogs.length > 0 && (
            <section>
              <h2 className="section-title">Trending</h2>
              <div className="blog-grid">
                {trendingBlogs.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </section>
          )}
          <section style={{ marginTop: "3rem" }}>
            <h2 className="section-title">All Posts</h2>
            <div className="blog-grid">
              {filteredBlogs.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
