import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FullSizeFlashcard.css'
import Comment from "./Comment";
import styled from 'styled-components';

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
  // const [question, setQuestion] = useState('');
  // const [comments, setComments] = useState([]);
    const question = 'Tester question - How many mailing items do i have?'
    const comments = [{voteCount: 1, id: 0, text: 'Comment 1'}, {voteCount:2, id: 1, text: 'You have quite a lot!'}];

  // useEffect(() => {
  //   axios.get('/flashcards/1')
  //     .then(response => {
  //       setQuestion(response.data.question);
  //       setComments(response.data.comments);
  //     })
  //     .catch(error => console.log(error));
  // }, []);

  return (
    <div className="flashcard-full">
      <div className="question-full">{question}</div>
      <div className="comments-full">
        {/*{comments.map(comment => (*/}
        {/*  <div className="comment" key={comment.id}>*/}
        {/*    <div className="text">{comment.text}</div>*/}
        {/*    <div className="votes">{comment.votes}</div>*/}
        {/*  </div>*/}
        {/*))}*/}
          {comments.map(comment => (
          <Comment
            key={comment.id}
            text={comment.text}
            initialVoteCount={comment.voteCount}
          />
          ))}
      </div>
    </div>
  );
};

export default FullSizeFlashcard;