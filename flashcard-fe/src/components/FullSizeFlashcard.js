import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FullSizeFlashcard.css'
import Comment from "./Comment";
import styled from 'styled-components';
import {API_FLASHCARD_DETAILED} from "../constants";
import {useParams} from "react-router-dom";

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


  return (
    <div className="flashcard-full">
      <div className="question-full">{question}</div>
        {/*<div className="question-full">{date}</div>*/}
      <div className="comments-full">
          {comments.map(comment => (
          <Comment
            key={comment.id}
            text={comment.answer}
            initialVoteCount={comment.votes}
          />
          ))}
      </div>
    </div>
  );
};

export default FullSizeFlashcard;