import Link from "next/link";
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
    blog_author?: any;
    documentId?: any;
  };
};

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  console.log(post)

  return (
    <Link href={`blog/${post.documentId}`}>
      <div className="blog-card">
        {post.imageUrl && (
          <img
            src={`http://localhost:1337${post.imageUrl}`}
            alt={post.title}
            className="blog-card-image"
            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
          />
        )}
        <div className="blog-content">
          <h3>{post.title}</h3>
          <p>
            By {post.blog_author?.username} | {post.readTime} min read
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
