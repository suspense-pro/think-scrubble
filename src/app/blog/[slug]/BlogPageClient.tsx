'use client';

import React, { useState, useMemo } from 'react';
import { Blog, Comment } from '@/lib/data';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReadingProgressBar from '@/components/ReadingProgressBar';
import LikeDislike from '@/components/LikeDislike';
import InlinePoll from '@/components/InlinePoll';
import Comments from '@/components/Comments';
import BlogCard from '@/components/BlogCard';

interface BlogPageClientProps {
  post: Blog;
  allPosts: Blog[];
  initialComments: Comment[];
}

const BlogPageClient = ({ post, allPosts, initialComments }: BlogPageClientProps) => {
  const [isSaved, setIsSaved] = useState(false);

  const relatedBlogs = useMemo(() => {
    return allPosts.filter((p) => post.relatedBlogIds.includes(p.id));
  }, [post, allPosts]);

  const handleShare = (platform: 'twitter' | 'facebook' | 'linkedin') => {
    const url = window.location.href;
    const text = `Check out this article: ${post.title}`;
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      // add other cases
    }
    window.open(shareUrl, '_blank');
  };

  return (
    <>
      <Header onSearch={() => {}} />
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
            style={{ objectFit: 'cover' }}
          />

          <div className="post-toolbar">
            <LikeDislike post={post} />
          </div>

          {post.audioUrl && (
            <div className="audio-player">
              <i className="material-icons">volume_up</i>
              <span>Listen to audio version</span>
              <audio controls src={post.audioUrl} style={{ marginLeft: 'auto' }}>
                Your browser does not support the audio element.
              </audio>
            </div>
          )}

          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {post.poll && <InlinePoll pollData={post.poll} />}

          <Comments blogId={post.id} initialComments={initialComments} />

          {relatedBlogs.length > 0 && (
            <section className="post-section">
              <h2 className="section-title">Related Blogs</h2>
              <div className="blog-grid">
                {relatedBlogs.map((p) => (
                  <BlogCard key={p.id} post={p} />
                ))}
              </div>
            </section>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
};

export default BlogPageClient;
