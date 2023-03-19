import React, { useState, useEffect } from 'react';
import {Button} from "reactstrap";
import axios from 'axios';
import './FullSizeFlashcard.css'
import Comment from "./Comment";
import styled from 'styled-components';
import {API_FLASHCARD_DETAILED} from "../constants";
import {Link, useParams} from "react-router-dom";

// const FullSizeFlashcard = () => {
//
//       return (
//     <div className="wrapper">
//       <h1>Marine Mammals</h1>
//       <h2> temp or ary? </h2>
//     </div>
//   );
//
//
// };

// class FullSizeFlashcard extends Component {
//
//     state = {
//         question;
//     };
//
//     axios.get(URL).then(res => this.setState({q
//
//
// }

// export default  FullSizeFlashcard;




const FullSizeFlashcard = () => {
    let {id} = useParams()
    console.log("id: " + id);
  const [question, setQuestion] = useState('');
  const [date, setDateCreated] = useState('');
  const [comments, setComments] = useState([]);
  const [newAnswerText, setNewAnswerText] = useState('');
  const [showAllComments, setShowAllComments] = useState(false);


  useEffect(() => {
      const URL = `http://localhost:8000/flashcard/rest-flashcard/${id}`;
    axios.get(URL)
      .then(response => {
          const data = response.data
        setQuestion(data.question);
        setComments(data.comments);
        setDateCreated(data.date_created);

      })
      .catch(error => console.log(error));
  }, [id]);

  const handleNewCommentSubmit = (event) => {
    event.preventDefault();


  const newComment = { answer: newAnswerText, votes: 1 };
    axios.post(`http://localhost:8000/flashcard/rest-flashcard/${id}/comments`, newComment)
      .then(response => {
        setComments([...comments, response.data]);
        setNewAnswerText('');
      })
      .catch(error => {
        console.log(error);
      });
  };

    function handleShowMoreLess() {
        setShowAllComments(!showAllComments);
    }

    return (
    <div className="flashcard-full">
        <div className="navigation">
          <Link to={"/"}>
            <button className="back-btn">View All Flashcards</button>
          </Link>
            <div className="nav-btns">
                <Link to={`/flashcards/${id - 1}`}>
                    <button className="prev-btn">Previous</button>
                </Link>
                <Link to={`/flashcards/${parseInt(id) + 1}`}>
                    <button className="next-btn">Next</button>
                </Link>
            </div>
        </div>
      <div className="question-full">{question}</div>
        {/*<div className="question-full">{date}</div>*/}
      <div className="comments-full right-pane">
          <div className="comments-without-form">
          {comments.slice(0, showAllComments ? comments.length : 3).map(comment => (
          <Comment
            key={comment.id}
            id={comment.id}
            text={comment.answer}
            initialVoteCount={comment.votes}
          />
          ))}
        {comments.length > 3 && (
            // <button className="show-more-less" onClick={handleShowMoreLess}>
            //   {showAllComments ? "Show less" : "See more"}
            // </button>
            <Button
                color="primary"
                onClick={handleShowMoreLess}
                style={{ minWidth: "200px"}}
            >
                {showAllComments ? "Show less" : "See more"}
            </Button>

        )}
              </div>
          <form onSubmit={handleNewCommentSubmit} className="new-comment-form">
              <textarea
                value={newAnswerText}
                onChange={(event) => setNewAnswerText(event.target.value)}
                className="new-comment-input"
                rows={3}
                placeholder="Got a better answer? Write it here!"
              />
              <button type="submit" className="new-comment-submit">Submit</button>
          </form>
      </div>
    </div>

  );
};

export default FullSizeFlashcard;