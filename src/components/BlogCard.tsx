/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Link from "next/link";
import Image from "next/image";
import { Blog } from "../lib/data";

interface BlogCardProps {
  post: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <Link href={`/blog/${post.slug}`} legacyBehavior>
      <div className="blog-card">
        <Image
          src={post.coverImage}
          alt={post.title}
          className="card-img"
          width={400}
          height={200}
          style={{ objectFit: "cover" }}
        />
        <div className="card-content">
          <span className="card-category">{post.category}</span>
          <h2 className="card-title">{post.title}</h2>
          <div className="card-footer">
            <span>By {post.author}</span> · <span>{post.readTime} min read</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
