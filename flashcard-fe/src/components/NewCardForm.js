import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { API_URL } from "../constants";
import axios from "axios";

class NewCardForm extends React.Component {
  state = {
      question: "",
      answer: "",
  };

  componentDidMount() {
    if (this.props.card) {
      const {question, answer} = this.props.card;
      this.setState({ question, answer});
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createCard = e => {
    e.preventDefault();
    const URL = "http://localhost:8000/flashcard/rest-flashcard/add/"
    axios.post(URL, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  editCard = e => {
    e.preventDefault();
    axios.put(API_URL + this.state.pk, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  render() {
    return (
      <Form onSubmit={this.props.card ? this.editCard : this.createCard}>
        <FormGroup>
          <Label for="question">Question:</Label>
          <Input
            type="text"
            name="question"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.name)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="answer">Answer:</Label>
          <Input
            type="text"
            name="answer"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.email)}
          />
        </FormGroup>
        <Button>Send</Button>
      </Form>
    );
  }
}
export default NewCardForm;