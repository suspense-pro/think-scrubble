import React from "react";

type BlogCardProps = {
  post: {
    id: number;
    title: string;
    slug: string;
    author: string;
    category: string;
    content: string;
    tags: string[];
    isTrending: boolean;
    readTime: number;
    createdAt?: string;
    imageUrl?: string;
  };
};

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <div className="blog-card">
      {post.imageUrl && (
        <img
          src={`http://localhost:1337${post.imageUrl}`}
          alt={post.title}
          className="blog-card-image"
          style={{ width: "100%", height: "auto", borderRadius: "8px" }}
        />
      )}
      <h3>{post.title}</h3>
      <p>By {post.author} | {post.readTime} min read</p>
    </div>
  );
};

export default BlogCard;
