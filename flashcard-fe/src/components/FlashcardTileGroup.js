import React, { useState } from 'react';
import './Flashcard.css';
import { Link } from "react-router-dom";

const Flashcard = ({question, answer, id}) => {
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

  // if (fullScreen){
  //   return (
  //       <div className="flashcard full-screen">
  //       <div className="question-answer">
  //         <div className="question">{question}</div>
  //         <div className="answer">{answer}</div>
  //       </div>
  //         <div className="comments">
  //           {comments.map((comment, index) => (
  //             <div key={index} className="comment">
  //               {comment}
  //             </div>
  //           ))}
  //         </div>
  //       <button className="exit-full-screen" onClick={handleExitFullScreenClick}>
  //         Exit Full Screen
  //       </button>
  //     </div>
  //   )
  // }

  return (
    <div
      className="flashcard"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="question">{question}</div>
      <div className={`answer ${showAnswer ? 'visible' : ''}`}>{answer}</div>
      {/*<button onClick={handleFullScreenClick}>Show Comments</button>*/}
      <Link to={`/flashcards/${id}`}>
        <button className="expand-button">Expand</button>
      </Link>
    </div>
  );
};


const FlashcardTileGroup = ({cards}) => {


    return (
    <div className="flashcard-list">
      {cards.map((flashcard, index) => (
          <Flashcard key={index} question={flashcard.question} answer={flashcard.answer} id={index} />
      ))}
    </div>
  );
};



export default FlashcardTileGroup;
