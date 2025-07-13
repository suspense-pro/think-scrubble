'use client';
import React, { useState } from 'react';
import { Blog } from '@/lib/data';
import { ThumbsUp, ThumbsDown, Share2 } from 'lucide-react';

type Props = {
  post: Blog;
};

const LikeDislike = ({ post }: Props) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const handleLike = () => setLikes(likes + 1);
  const handleDislike = () => setDislikes(dislikes + 1);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `Check out this article: ${post.title}`;
    let shareUrl = '';

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
    }

    if (shareUrl) window.open(shareUrl, '_blank');
  };

  return (
    <div className="flex items-center gap-4 mt-4">
      <button onClick={handleLike} className="flex items-center gap-1">
        <ThumbsUp size={20} /> {likes}
      </button>
      <button onClick={handleDislike} className="flex items-center gap-1">
        <ThumbsDown size={20} /> {dislikes}
      </button>
      <button onClick={() => handleShare('twitter')} className="ml-auto flex items-center gap-1">
        <Share2 size={20} /> Share
      </button>
    </div>
  );
};

export default LikeDislike;
