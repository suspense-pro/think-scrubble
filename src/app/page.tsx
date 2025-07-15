"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Blog } from "../lib/data";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BlogCard from "../components/BlogCard";

const HomePage = () => {
  const [allBlogs, setAllBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:1337/api/blogs?populate=cover_image");
        const json = await res.json();

        const blogs = json.data.map((item: any) => ({
          id: item.id,
          title: item.Title,
          slug: item.slug,
          author: "Unknown",
          category: "General",
          content: item.content,
          tags: item.tags ?? [],
          isTrending: item.isTrending ?? false,
          readTime: item.readTime,
          createdAt: item.createdAt,
          imageUrl:
            item.cover_image?.formats?.medium?.url ||
            item.cover_image?.url ||
            "",
        }));

        setAllBlogs(blogs);
        setFilteredBlogs(blogs);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
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
      <Header />
      <main className="main-content">
        <div className="container">
          <div className="search-bar" style={{ margin: "2rem 0" }}>
            <input
              type="search"
              placeholder="Search articles..."
              className="search-input"
              onChange={(e) => handleSearch(e.target.value)}
              aria-label="Search articles"
            />
          </div>

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
