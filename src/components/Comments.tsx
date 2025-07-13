/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Comment as CommentType, formatDate } from "../lib/data"; // Import the Comment type and formatDate utility

// Define the type for the component's props
interface CommentsProps {
  blogId: number;
  initialComments: CommentType[];
}

const Comments: React.FC<CommentsProps> = ({ blogId, initialComments }) => {
  // Type the state hooks
  const [comments, setComments] = useState<CommentType[]>(initialComments);
  const [newComment, setNewComment] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment: CommentType = {
        id: Date.now(),
        blogId,
        author: "Guest", // Hardcoded for this demo
        body: newComment,
        date: new Date().toISOString().split("T")[0],
      };
      setComments([comment, ...comments]);
      setNewComment("");
    }
  };

  return (
    <div className="post-section">
      <h2 className="section-title">Comments ({comments.length})</h2>
      <form onSubmit={handleSubmit} className="comments-form">
        <textarea
          value={newComment}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewComment(e.target.value)}
          placeholder="Join the discussion..."
          aria-label="Add a comment"
          required
        ></textarea>
        <button type="submit" className="btn btn-primary">
          Submit Comment
        </button>
      </form>
      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <p>
              <span className="comment-author">{comment.author}</span>
              <span className="comment-date">{formatDate(comment.date)}</span>
            </p>
            <p className="comment-body">{comment.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
