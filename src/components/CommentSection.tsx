'use client'
import React, { useState, useEffect } from 'react';
import Comment from '@/src/components/Comment';
import { getAuth } from "firebase/auth";
import {auth} from "@/app/layout";
import '@/src/styles/comment.css';

const CommentSection = ({ listingId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    user: "", 
    timeDate: "", 
    like: false, 
    dislike: false, 
    text: "",
    replies: [], 
    listing: listingId 
});


  // Function to fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:8000/comments`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [listingId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewComment(prevComment => ({
      ...prevComment,
      [name]: value
    }));
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      console.error("User not authenticated");
      return;
    }
    try {
      const response = await fetch(`http://localhost:8000/comments/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newComment,
          timeDate: new Date(), 
          user: user.uid,
        }), 
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setComments(currentComments => [...currentComments, data]);
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <div className="comment-section">
      <div className="title-container">
        <div className="content-title"> Comments and Bids</div>
        <div className="filter-container">
          <div className="filters"> Newest |</div>
          <div className="filters"> Oldest |</div>
          <div className="filters"> Most Upvoted |</div>
          <div className="filters"> Seller Replies |</div>
          <div className="filters"> Bid History</div>
        </div>
      </div>
      <div className="add-comment">
        <form onSubmit={handleCommentSubmit}>
          <input
            name="text"
            placeholder="Add a comment..."
            value={newComment.text}
            onChange={handleChange}
          />
        </form>
      </div>
  
      <div className="single-container">
        {comments.map((comment) => (
          <Comment
            username={comment.user}
            timestamp={comment.timeDate} 
            text={comment.text}
            initialLike={comment.like}
            initialDislike={comment.dislike}
            replies={comment.replies}
          />
        ))}
      </div>
      <div className="view-all"> View All Comments </div>
    </div>
  );
}  

export default CommentSection;