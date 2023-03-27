import React, { useState, useEffect } from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import './TopicsPage.css';

function FlashcardTopics() {
  const [topics, setTopics] = useState([]);


  useEffect(() => {
      const URL = "http://localhost:8000/flashcard/topics"
    axios.get(URL)
        .then(response => {
        const data = response.data
          setTopics(data)
    })
      .catch(error => console.log(error))
  }, []);

  return (
    <div className="topic-grid">
      {topics.map(topic => (
        <div
          key={topic.id}
          className="topic-tile"
          style={{ backgroundColor: topic.background_colour }}
        >
          <h3>{topic.name}</h3>
          <Link to={`/flashcards/biology`}>
            <button className="expand-button">View Flashcards</button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default FlashcardTopics;
