"use client";

import React, { useState, useMemo } from "react";
import { Blog, Comment } from "@/lib/data";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import LikeDislike from "@/components/LikeDislike";
import InlinePoll from "@/components/InlinePoll";
import Comments from "@/components/Comments";
import BlogCard from "@/components/BlogCard";
import ReactMarkdown from "react-markdown";
import { useParams } from "next/navigation";

interface BlogPageClientProps {
  post: Blog;
  allPosts: Blog[];
  initialComments: Comment[];
}

const BlogPageClient = ({ post, initialComments }: BlogPageClientProps) => {
  const [isSaved, setIsSaved] = useState(false);

  const handleShare = (platform: "twitter" | "facebook" | "linkedin") => {
    const url = window.location.href;
    const text = `Check out this article: ${post.title}`;
    let shareUrl = "";
    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      // add other cases
    }
    window.open(shareUrl, "_blank");
  };

  const params = useParams();
  const slug = params?.slug as string;

  const handleBookmark = async () => {
    const rawUser = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    let user = null;

    try {
      user = rawUser ? JSON.parse(rawUser) : null;
    } catch (err) {
      console.error("Error parsing user from localStorage:", err);
      return;
    }

    if (!user?.documentId) {
      alert("You must be logged in to save bookmarks.");
      return;
    }

    try {
      const res = await fetch("http://localhost:1337/api/user-bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include token here if using auth
        },
        body: JSON.stringify({
          data: {
            author: user.documentId,
            blog: slug,
          },
        }),
      });

      if (res.ok) {
        setIsSaved(true);
        console.log("Bookmark saved!");
      } else {
        console.error("Failed to save bookmark:", await res.text());
      }
    } catch (err) {
      console.error("Error saving bookmark:", err);
    }
  };

  return (
    <>
      <Header />
      <main className="main-content">
        <ReadingProgressBar />
        <article className="container">
          <header className="post-header">
            <p className="post-meta">
              <span>{post.category}</span> · <span>{post.readTime} min read</span>
            </p>
            <h1 className="post-title">{post.title}</h1>
            <p className="post-meta">By {post.author}</p>
          </header>

          <Image
            src={post.coverImage}
            alt={post.title}
            className="post-cover-image"
            width={960}
            height={500}
            priority
            style={{ objectFit: "cover" }}
          />

          <div className="post-toolbar">
            <LikeDislike post={post} />
          </div>

          <button onClick={handleBookmark} className={`btn ${isSaved ? "saved" : ""}`}>
            {isSaved ? "Saved" : "Save"}
          </button>

          {post.audioUrl && (
            <div className="audio-player">
              <i className="material-icons">volume_up</i>
              <span>Listen to audio version</span>
              <audio controls src={post.audioUrl} style={{ marginLeft: "auto" }}>
                Your browser does not support the audio element.
              </audio>
            </div>
          )}

          {/* <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          /> */}
          <ReactMarkdown>{post.content}</ReactMarkdown>

          {/* {post.poll && <InlinePoll pollData={post.poll} />} */}

          <Comments blogId={post.id} initialComments={post?.comments || initialComments} />

          {/* {relatedBlogs.length > 0 && (
            <section className="post-section">
              <h2 className="section-title">Related Blogs</h2>
              <div className="blog-grid">
                {relatedBlogs.map((p) => (
                  <BlogCard key={p.id} post={p} />
                ))}
              </div>
            </section>
          )} */}
        </article>
      </main>
      <Footer />
    </>
  );
};

export default BlogPageClient;
