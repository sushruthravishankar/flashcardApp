import React, { Component, Fragment } from "react";
// import Header from "./components/Header";
import Home from "./components/Home";
// import {
//     BrowserRouter, Switch, Route, Routes
// } from "react-router-dom";

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FullSizeFlashcard from "./components/FullSizeFlashcard";
import Login from "./components/Login";
import FlashcardTileGroup from "./components/FlashcardTileGroup";

class App extends Component {
  render() {
    return (
    <BrowserRouter>
        <Routes>
          {/*<Route path="/">*/}
         <Route path="/flashcards/:id" element={<FullSizeFlashcard/>} />
          <Route path="/" element={<Login />} />
        <Route path="/flashcards" element={<Home/>}/>

          {/*<Fragment>*/}
          {/*  <Home />*/}
          {/*</Fragment>*/}
          {/*  <Route path='flashcard/'*/}
        </Routes>
    </BrowserRouter>
    );
  }
}



export default App;
