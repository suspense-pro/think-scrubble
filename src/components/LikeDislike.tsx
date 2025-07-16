"use client";

import React, { useState, useEffect } from "react";
import { Blog } from "@/lib/data";
import { ThumbsUp, ThumbsDown, Share2 } from "lucide-react";

type Props = {
  post: Blog;
};

const LikeDislike = ({ post }: Props) => {
  const [likes, setLikes] = useState(post?.likes || 0);
  const [dislikes, setDislikes] = useState(post?.dislikes || 0);
  const [userInteraction, setUserInteraction] = useState<"like" | "dislike" | null>(null);

  const postKey = `interaction-${post.id}`;

  useEffect(() => {
    try {
      const stored = localStorage.getItem(postKey);
      if (stored === "like" || stored === "dislike") {
        setUserInteraction(stored);
      }
    } catch (err) {
      console.error("Failed to load interaction from localStorage", err);
    }
  }, [postKey]);

  const getUser = () => {
    try {
      const rawUser = localStorage.getItem("user");
      return rawUser ? JSON.parse(rawUser) : null;
    } catch {
      return null;
    }
  };

  const handleLike = () => {
    const user = getUser();
    if (!user) return alert("Please login to like");

    if (userInteraction === "like") {
      // Remove like
      setLikes((prev) => prev - 1);
      setUserInteraction(null);
      localStorage.removeItem(postKey);
    } else {
      // If switching from dislike to like
      if (userInteraction === "dislike") {
        setDislikes((prev) => prev - 1);
      }

      setLikes((prev) => prev + 1);
      if (userInteraction === "dislike") setDislikes((prev) => Math.max(prev - 1, 0));

      setUserInteraction("like");
      localStorage.setItem(postKey, "like");
    }
  };

  const handleDislike = () => {
    const user = getUser();
    if (!user) return alert("Please login to dislike");

    if (userInteraction === "dislike") {
      // Remove dislike
      setDislikes((prev) => prev - 1);
      setUserInteraction(null);
      localStorage.removeItem(postKey);
    } else {
      // If switching from like to dislike
      if (userInteraction === "like") {
        setLikes((prev) => prev - 1);
      }

      setDislikes((prev) => prev + 1);
      setUserInteraction("dislike");
      localStorage.setItem(postKey, "dislike");
    }
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `Check out this article: ${post.title}`;
    let shareUrl = "";

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          url
        )}&text=${encodeURIComponent(text)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          url
        )}`;
        break;
    }

    if (shareUrl) window.open(shareUrl, "_blank");
  };

  return (
    <div className="flex items-center gap-4 mt-4">
      <button
        onClick={handleLike}
        className={`flex items-center gap-1 ${
          userInteraction === "like" ? "text-blue-600 font-semibold" : ""
        }`}
      >
        <ThumbsUp size={20} /> {likes}
      </button>

      <button
        onClick={handleDislike}
        className={`flex items-center gap-1 ${
          userInteraction === "dislike" ? "text-red-600 font-semibold" : ""
        }`}
      >
        <ThumbsDown size={20} /> {dislikes}
      </button>

      <button
        onClick={() => handleShare("twitter")}
        className="ml-auto flex items-center gap-1"
      >
        <Share2 size={20} /> Share
      </button>
    </div>
  );
};

export default LikeDislike;
