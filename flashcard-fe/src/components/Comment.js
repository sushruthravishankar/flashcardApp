import React, { useState } from 'react';
import './Comment.css';

const Comment = ({text, initialVoteCount}) => {
  const [voteCount, setVoteCount] = useState(initialVoteCount);

  function handleIncreaseVote() {
    setVoteCount(voteCount + 1);
  }

  function handleDecreaseVote() {
    setVoteCount(voteCount - 1);
  }

  return (
    <div className="comment">
      <div className="vote-buttons">
        <button onClick={handleIncreaseVote} className="vote-up"></button>
        <div className="vote-count">{voteCount}</div>
        <button onClick={handleDecreaseVote} className="vote-down"></button>
      </div>
      <div className="comment-text">{text}</div>
    </div>
  );
}

export default Comment;