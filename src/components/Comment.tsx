'use client'
import React, { useState, useEffect } from 'react';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

import '@/src/styles/comment.css';

const Comment = ({
  username,
  timestamp,
  text,
  initialLike,
  initialDislike,
  replies,
}) => {
  const [like, setLike] = useState(initialLike);
  const [dislike, setDislike] = useState(initialDislike);

  const toggleLike = () => {
    const newLike = !like;
    setLike(newLike);
  };

  const toggleDislike = () => {
    const newDislike = !dislike;
    setDislike(newDislike);
  };

  const [formattedTimestamp, setFormattedTimestamp] = useState('');

  useEffect(() => {
    const commentDate = new Date(timestamp.replace('at', ''));
    const currentDate = new Date();
    const timeDiff = currentDate.getTime() - commentDate.getTime();

    const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (daysDiff >= 1) {
      setFormattedTimestamp(`${daysDiff} day${daysDiff > 1 ? 's' : ''} ago`);
    } else if (hoursDiff >= 1) {
      setFormattedTimestamp(`${hoursDiff} hour${hoursDiff > 1 ? 's' : ''} ago`);
    } else {
      setFormattedTimestamp('Just now');
    }
  }, [timestamp]);

  return (
    <div className="single-container">
      <div className="username-container">
        <div className="comment-username">{username}</div>
        <div className="timestamp">{formattedTimestamp}</div>
      </div>
      <div className="comment-text">{text}</div>
      <div className="comment-interaction">
        {like ? (
          <ThumbUpAltIcon className="like" onClick={toggleLike} />
        ) : (
          <ThumbUpOffAltIcon className="like-off" onClick={toggleLike} />
        )}
        &nbsp;&nbsp;
        {dislike ? (
          <ThumbDownAltIcon className="dislike" onClick={toggleDislike} />
        ) : (
          <ThumbDownOffAltIcon className="dislike-off" onClick={toggleDislike} />
        )}
        &nbsp;&nbsp;
        <span role="img" aria-label="replies" className="replies">
          💬Reply
        </span>
      </div>
    </div>
  );
};

export default Comment;



