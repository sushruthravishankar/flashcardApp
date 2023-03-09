import React, {Component, useState} from "react";
import { Table } from "reactstrap";
import NewCardModal from "./NewCardModal";
import styled from "styled-components";

// class CardList extends Component

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
const CardList = (props) => {
  // render() {
    const [showAnswer, setShowAnswer] = useState(false);
      // console.log(props.cards);

    return (
      <div>
      {
        props.cards.map(card => (
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
      // <Table dark>
      //   <thead>
      //     <tr>
      //       <th>Question</th>
      //       <th>Answer</th>
      //       <th>Date Created</th>
      //         <th></th>
      //     </tr>
      //   </thead>
      //   <tbody>
      //     {!cards || cards.length <= 0 ? (
      //         // TODO "remove" this for error checking
      //       <tr>
      //         <td colSpan="6" align="center">
      //           <b>Ops, no questions here yet</b>
      //         </td>
      //       </tr>
      //     ) : (
      //       cards.map(card => (
      //         <tr key={card.date_created}>
      //           <td>{card.question}</td>
      //           <td>{card.answer}</td>
      //           <td>{card.date_created}</td>
      //           <td align="center">
      //             {/*<NewCardModal*/}
      //             {/*  create={false}*/}
      //             {/*  card={card}*/}
      //             {/*  resetState={this.props.resetState}*/}
      //             {/*/>*/}
      //           </td>
      //         </tr>
      //       ))
      //     )}
      //   </tbody>
      // </Table>
    );
}

export default CardList;