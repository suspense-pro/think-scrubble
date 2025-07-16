/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Comment as CommentType, formatDate } from "../lib/data"; // Import the Comment type and formatDate utility
import axios from "axios";
import { useParams } from "next/navigation";

// Define the type for the component's props
interface CommentsProps {
  blogId: number;
  initialComments: CommentType[];
}

const Comments: React.FC<CommentsProps> = ({ blogId, initialComments }) => {
  // Type the state hooks
  const [comments, setComments] = useState<CommentType[]>(initialComments);
  const [newComment, setNewComment] = useState<string>("");

  const params = useParams();
  const slug = params?.slug as string;

  const rawUser = localStorage.getItem("user");
  let user = null;

  try {
    user = rawUser ? JSON.parse(rawUser) : null;
  } catch (err) {
    console.error("Error parsing user from localStorage:", err);
    user = null;
  }

  const handleSubmit = () => {
    if (newComment.trim()) {
      const comment: CommentType = {
        id: Date.now(),
        blogId,
        author: "Guest", // Hardcoded for this demo
        content: newComment,
        publishedAt: new Date().toISOString().split("T")[0],
      };
      setComments([...comments, comment]);
      setNewComment("");
    }
  };

  const postComment = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:1337/api/comments", {
        data: {
          content: newComment,
          blog: slug,
          isApproved: false,
          author: user?.documentId,
        },
      });

      if (res.data) {
        handleSubmit();
      }

      console.log("Comment posted:", res.data);
    } catch (err) {
      console.error("Failed to post comment:", err);
    }
  };

  return (
    <div className="post-section">
      <h2 className="section-title">Comments ({comments.length})</h2>
      <form onSubmit={handleSubmit} className="comments-form">
        <textarea
          value={newComment}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setNewComment(e.target.value)
          }
          placeholder="Join the discussion..."
          aria-label="Add a comment"
          required
        ></textarea>
        <button
          onClick={(e) => {
            postComment(e);
          }}
          className="btn btn-primary"
        >
          Submit Comment
        </button>
      </form>
      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <p>
              <span className="comment-author">
                {comment.author || "Guest"}
              </span>
              <span className="comment-date">
                {formatDate(comment?.publishedAt)}
              </span>
            </p>
            <p className="comment-body">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;