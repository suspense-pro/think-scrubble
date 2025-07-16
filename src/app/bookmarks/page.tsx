"use client";

import BlogCard from "@/components/BlogCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Blog } from "@/lib/data";
import React, { useState, useEffect } from "react";

const BookmarksPage = () => {
  const [bookmarkedBlogs, setBookmarkedBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const res = await fetch(
          "http://localhost:1337/api/user-bookmarks?populate[blog][populate][0]=cover_image&populate[blog][populate][1]=blog_author"
        );
        const json = await res.json();

        const blogs = json.data
          .map((bookmark: any) => bookmark.blog)
          .filter(Boolean)
          .map((item: any) => ({
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

        setBookmarkedBlogs(blogs);
      } catch (error) {
        console.error("Failed to fetch bookmarks:", error);
      }
    };

    fetchBookmarks();
  }, []);

  return (
    <>
      <Header />
      <main className="main-content">
        <div className="container">
          <h2 className="section-title" style={{ marginTop: "2rem" }}>
            Your Bookmarked Articles
          </h2>
          {bookmarkedBlogs.length > 0 ? (
            <div className="blog-grid">
              {bookmarkedBlogs.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p style={{ marginTop: "2rem" }}>
              You haven't bookmarked any articles yet.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BookmarksPage;
