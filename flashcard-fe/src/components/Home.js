import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
// import CardList from "./CardList";
import NewCardModal from "./NewCardModal";

import axios from "axios";

import { API_URL } from "../constants";
import FlashcardTileGroup from "./FlashcardTileGroup";

class Home extends Component {
  state = {
    cards: []
  };

  componentDidMount() {
    this.resetState();
  }

  getCards = () => {
    const URL = "http://localhost:8000/flashcard/rest-flashcard/all"
    axios.get(URL).then(res => this.setState({ cards: res.data }));
  };

  resetState = () => {
    this.getCards();
  };

  render() {
    return (
      <Container style={{ marginTop: "20px" }}>
        <Row>
          <Col>
            <FlashcardTileGroup
              cards={this.state.cards}
              // resetState={this.resetState}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <NewCardModal create={true} resetState={this.resetState} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;