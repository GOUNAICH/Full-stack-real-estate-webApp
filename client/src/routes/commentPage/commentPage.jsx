import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faTrashAlt, faReply } from "@fortawesome/free-solid-svg-icons";
import "./commentPage.scss";

function CommentsPage() {
  const postImage = "House.jpg";
  const avatarComment = "/noavatar.jpg";

  const [comments, setComments] = useState([
    {
      id: 1,
      username: "John Doe",
      avatar: "noavatar.jpg",
      text: "This is a sample comment.",
      createdAt: "2023-05-14T12:34:56Z",
      likes: 0,
      replies: [],
    },
    {
      id: 2,
      username: "Jane Smith",
      avatar: "noavatar.jpg",
      text: "This is another sample comment.",
      createdAt: "2023-05-14T13:45:12Z",
      likes: 0,
      replies: [],
    },
  ]);
  const [newComment, setNewComment] = useState("");
  const [replyText, setReplyText] = useState(""); // State to hold reply text
  const [replyingTo, setReplyingTo] = useState(null); // State to hold the comment being replied to

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newCommentObj = {
      id: comments.length + 1,
      username: "Current User",
      avatar: "noavatar.jpg",
      text: newComment,
      createdAt: new Date().toISOString(),
      likes: 0,
      replies: [],
    };

    setComments([newCommentObj, ...comments]);
    setNewComment("");
  };

  const handleLike = (commentId) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment
      )
    );
  };

  const handleDelete = (commentId) => {
    setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
  };

  const handleReply = (commentId, replyText) => {
    const newReply = {
      id: comments.length + 1,
      username: "Current User",
      avatar: "noavatar.jpg",
      text: replyText,
      createdAt: new Date().toISOString(),
    };

    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId ? { ...comment, replies: [...comment.replies, newReply] } : comment
      )
    );
    setReplyingTo(null); // Reset replyingTo state after sending the reply
    setReplyText(""); // Clear reply input field after sending the reply
  };

  return (
    <div className="commentsPage">
      <div className="postImageContainer">
        <img src={postImage} alt="Post" />
        <div className="user">
          <img src={avatarComment} alt="Avatar" />
          <p>Abdeslam Gounaich</p>
        </div>
      </div>
      <div className="commentsSection">
        <div className="wrapper">
          <div className="title">
            <h1>Comments</h1>
          </div>
          <form onSubmit={handleCommentSubmit} className="commentForm">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
            ></textarea>
            <button type="submit">Submit</button>
          </form>
          <div className="commentsList">
            {comments.map((comment) => (
              <div className="comment" key={comment.id}>
                <img src={comment.avatar} alt="Avatar" />
                <div className="commentDetails">
                  <span className="username">{comment.username}</span>
                  <span className="timestamp">
                    {new Date(comment.createdAt).toLocaleString()}
                  </span>
                  <p>{comment.text}</p>
                  <div className="actions">
                    <button onClick={() => handleLike(comment.id)}>
                      <FontAwesomeIcon icon={faThumbsUp} /> Like ({comment.likes})
                    </button>
                    <button onClick={() => handleDelete(comment.id)}>
                      <FontAwesomeIcon icon={faTrashAlt} /> Delete
                    </button>
                    <button onClick={() => setReplyingTo(comment.id)}>
                      <FontAwesomeIcon icon={faReply} /> Reply
                    </button>
                  </div>
                  <div className="replies">
                    {comment.replies.map((reply) => (
                      <div className="reply" key={reply.id}>
                        <img src={reply.avatar} alt="Avatar" />
                        <div className="replyDetails">
                          <span className="username">{reply.username}</span>
                          <span className="timestamp">
                            {new Date(reply.createdAt).toLocaleString()}
                          </span>
                          <p>{reply.text}</p>
                        </div>
                      </div>
                    ))}
                    {/* Add reply input and send button */}
                    {replyingTo === comment.id && (
                      <div className="replyInput">
                        <input
                          type="text"
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Write a reply..."
                        />
                        <button
                          onClick={() => {
                            if (replyText.trim()) {
                              handleReply(comment.id, replyText);
                            }
                          }}
                        >
                          Send
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentsPage;
