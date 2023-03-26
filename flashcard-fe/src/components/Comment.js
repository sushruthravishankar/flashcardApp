import React, { useState } from 'react';
import './Comment.css';
import axios from "axios";

const Comment = ({id, text, initialVoteCount, username}) => {
  const [voteCount, setVoteCount] = useState(initialVoteCount);

  function handleIncreaseVote() {
    // setVoteCount(voteCount + 1);
    const newVoteCount = voteCount + 1;
    const URL = `http://localhost:8000/flashcard/comment/upvote/${id}`;
    axios.put(URL, { voteCount: newVoteCount})
         .then(_ => {
        setVoteCount(newVoteCount);
      })
      .catch(error => {
        console.log(error);
      });
  }

  function handleDecreaseVote() {
    // setVoteCount(voteCount + 1);
    const newVoteCount = voteCount - 1;
    const URL = `http://localhost:8000/flashcard/comment/downvote/${id}`;
    axios.put(URL, { voteCount: newVoteCount})
         .then(_ => {
        setVoteCount(newVoteCount);
      })
      .catch(error => {
        console.log(error);
      });
  }


  return (
    <div className="comment_button">
      <div className="vote-buttons">
        <button onClick={handleIncreaseVote} className="vote-up"></button>
        <div className="vote-count">{voteCount}</div>
        <button onClick={handleDecreaseVote} className="vote-down"></button>
      </div>
      <div className="comment-text">{text}</div>
      <div className="comment-username">{username}</div>
    </div>
  );
}

export default Comment;