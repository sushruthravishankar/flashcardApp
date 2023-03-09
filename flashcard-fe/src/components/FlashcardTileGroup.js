import React, { useState } from 'react';
import styled from 'styled-components';

// const cards = [  { question: 'What is the capital of France?', answer: 'Paris' },  { question: 'What is the largest planet in our solar system?', answer: 'Jupiter' },  { question: 'What is the tallest mammal?', answer: 'Giraffe' },  { question: 'What is the smallest country in the world?', answer: 'Vatican City' },  { question: 'What is the name of the first man to walk on the moon?', answer: 'Neil Armstrong' },  { question: 'What is the name of the largest ocean on Earth?', answer: 'Pacific Ocean' },];

const Card = styled.div`
  background-color: #ffffff;
  border: 1px solid #cccccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  margin: 1rem;
  width: calc(33.33% - 2rem);
  height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: transform 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    z-index: 1;
  }
`;

const Question = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
`;

const Answer = styled.p`
  font-size: 1.2rem;
  font-style: italic;
  text-align: center;
`;

const FlashcardTileGroup = (props) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const cards = props.cards;
  console.log(cards);
  return (
    <div>
      {
        cards.map(card => (
        <Card
            key={card.date_created}
            onMouseEnter={() => setShowAnswer(true)}
            onMouseLeave={() => setShowAnswer(false)}
          >
            <Question>{card.question}</Question>
            {showAnswer && <Answer>{card.answer}</Answer>}
          </Card>
        ))
      }
    </div>
  );
};

export default FlashcardTileGroup;
