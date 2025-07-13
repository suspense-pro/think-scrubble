/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Blog } from "../lib/data";

type LikeDislikeProps = {
  post: Pick<Blog, "likes" | "dislikes">;
};

const LikeDislike: React.FC<LikeDislikeProps> = ({ post }) => {
  const [likes, setLikes] = useState(post.likes);
  const [dislikes, setDislikes] = useState(post.dislikes);
  const [userVote, setUserVote] = useState<"like" | "dislike" | null>(null);

  const handleLike = () => {
    if (userVote === "like") {
      setLikes(likes - 1);
      setUserVote(null);
    } else {
      setLikes(likes + 1);
      if (userVote === "dislike") setDislikes(dislikes - 1);
      setUserVote("like");
    }
  };

  const handleDislike = () => {
    if (userVote === "dislike") {
      setDislikes(dislikes - 1);
      setUserVote(null);
    } else {
      setDislikes(dislikes + 1);
      if (userVote === "like") setLikes(likes - 1);
      setUserVote("dislike");
    }
  };

  return (
    <div className="toolbar-group">
      <button
        onClick={handleLike}
        className={`icon-btn ${userVote === "like" ? "active" : ""}`}
        aria-label="Like this post"
      >
        <i className="material-icons">thumb_up</i> {likes}
      </button>
      <button
        onClick={handleDislike}
        className={`icon-btn ${userVote === "dislike" ? "active" : ""}`}
        aria-label="Dislike this post"
      >
        <i className="material-icons">thumb_down</i> {dislikes}
      </button>
    </div>
  );
};

export default LikeDislike;
