import React, {useState} from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import Study from "./Study";
import CardCreate from "./CardCreate";
import CardEdit from "./CardEdit";
import DeckView from "./DeckView";
import DeckCreate from "./DeckCreate";
import DeckEdit from "./DeckEdit";
import { Route, Switch } from "react-router-dom";

function Layout() {
  const [decks, setDecks] = useState([]);
  const [deck, setDeck] = useState({});
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <Home decks={decks} setDecks={setDecks} setDeck={setDeck}/>
          </Route>
          <Route exact path="/decks/new">
            <DeckCreate />
          </Route>
          <Route exact path="/decks/:deckId">
            <DeckView />
          </Route>
          <Route exact path="/decks/:deckId/edit">
            <DeckEdit />
          </Route>
          <Route exact path="/decks/:deckId/cards/new">
            <CardCreate deck={deck} setDeck={setDeck}/>
          </Route>
          <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <CardEdit deck={deck} setDeck={setDeck}/>
          </Route>
          <Route exact path="/decks/:deckId/study">
            <Study deck={deck} setDeck={setDeck}/>
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
