import React from "react";
import { useHistory, Link } from "react-router-dom";

function NotEnoughCards({ deck }) {
  const history = useHistory();

  function addCardHandler() {
    history.push(`/decks/${deck.id}/cards/new`);
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/">{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <h1>Study: {deck.name}</h1>
      <h4>Not enough cards.</h4>
      <p>
        You need at least 3 cards to study. There are {deck.cards.length} cards
        in this deck
      </p>
      <button
        className="btn btn-primary"
        type="button"
        onClick={addCardHandler}
      >
        Add Cards
      </button>
    </div>
  );
}

export default NotEnoughCards;