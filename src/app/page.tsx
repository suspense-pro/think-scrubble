"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Blog } from "../lib/data";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BlogCard from "../components/BlogCard";
import { Link } from "lucide-react";

const HomePage = () => {
  const [allBlogs, setAllBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [trendingBlogs, setTrendingBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:1337/api/blogs?populate=*");
        const json = await res.json();

        const blogs = json.data.map((item: any) => ({
          id: item.id,
          documentId: item.documentId,
          title: item.Title,
          slug: item.slug,
          blog_author: item?.blog_author,
          category: item?.category,
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "http://localhost:1337/api/blogs?populate=*&sort=likes:desc&pagination[limit]=2"
        );
        const json = await res.json();

        const blogs = json.data.map((item: any) => ({
          id: item.id,
          documentId: item.documentId,
          title: item.Title,
          slug: item.slug,
          blog_author: item?.blog_author,
          category: item?.category,
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

        setTrendingBlogs(blogs);
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
