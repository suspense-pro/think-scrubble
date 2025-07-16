'use client';

import React, { useEffect, useState } from 'react';
import BlogPageClient from './BlogPageClient';
import axios from 'axios';
import { useParams } from 'next/navigation';

const API_URL = 'http://localhost:1337';

const SingleBlogPage = () => {
  const [post, setPost] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

 const params = useParams();
  const slug = params?.slug as string;

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/blogs/${slug}?populate=*`);
        const raw = res?.data?.data;

        // Transform raw response into expected format
        const transformedPost = {
          comments: raw?.comments,
          id: raw.id,
          title: raw.Title,
          slug: raw.slug,
          content: raw.content,
          readTime: raw.readTime,
          coverImage: `${API_URL}${raw.cover_image?.formats?.medium?.url || raw.cover_image?.url}`,
          category: raw.category?.name || 'Uncategorized',
          author: raw.blog_author?.username || 'Unknown',
          audioUrl: raw.audioVersion || null,
          likes: raw.likes || 0,
          dislikes: raw.dislikes || 0,
          poll: null, // Fill this if your blog has poll data
        };

        setPost(transformedPost);
      } catch (err) {
        console.error('Error fetching blog:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) return <p>Loading blog...</p>;
  if (!post) return <p>Blog not found.</p>;

  return <BlogPageClient post={post} allPosts={[post]} initialComments={[]} />;
};

export default SingleBlogPage;
