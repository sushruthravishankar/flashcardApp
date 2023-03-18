import React, { useState } from 'react';
import './Flashcard.css';
import { Link } from "react-router-dom";

const Flashcard = ({question, top_comment, id}) => {
  console.log(id);
  const [showAnswer, setShowAnswer] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const comments = ['Beautiful city!', 'I love the food there.']

  const handleMouseEnter = () => {
    setShowAnswer(true);
  };

  const handleMouseLeave = () => {
    setShowAnswer(false);
  };

  const handleFullScreenClick = () => {
    setFullScreen(true);
  };

  const handleExitFullScreenClick = () => {
    setFullScreen(false);
  };

  return (
    <div
      className="flashcard"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="question">{question}</div>
      <div className={`answer ${showAnswer ? 'visible' : ''}`}>{top_comment.answer}</div>
      {/*<button onClick={handleFullScreenClick}>Show Comments</button>*/}
      <Link to={`/flashcards/${id + 1}`}>
        <button className="expand-button">Expand</button>
      </Link>
    </div>
  );
};


const FlashcardTileGroup = ({cards}) => {


    return (
    <div className="flashcard-list">
      {cards.map((flashcard, index) => (
          <Flashcard key={index} question={flashcard.question} top_comment={flashcard.top_comment} id={index} />
      ))}
    </div>
  );
};



export default FlashcardTileGroup;
