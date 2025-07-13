import { notFound } from 'next/navigation';
import { dummyData } from '@/lib/data';
import BlogPageClient from './BlogPageClient';
import { Metadata } from 'next';

export async function generateStaticParams() {
  return dummyData.blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = dummyData.blogs.find((b) => b.slug === params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | NextGen Blog`,
    description: post.content.substring(3, 150),
  };
}

export default async function BlogPage({ params }: { params: { slug: string } }) {
  const post = dummyData.blogs.find((b) => b.slug === params.slug);
  if (!post) return notFound();

  const allPosts = dummyData.blogs;
  const initialComments = dummyData.comments.filter((c) => c.blogId === post.id);

  return (
    <BlogPageClient post={post} allPosts={allPosts} initialComments={initialComments} />
  );
}
