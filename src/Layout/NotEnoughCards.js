import React from "react";
import { useHistory } from "react-router-dom";

function NotEnoughCards({ deck }) {
  const history = useHistory();

  function addCardHandler() {
    history.push(`/decks/${deck.id}/cards/new`);
  }

  return (
    <div>
      <h4 className="ml-2">Not enough cards.</h4>
      <p className="mt-4 ml-2">
        You need at least 3 cards to study. There are {deck.cards.length} cards
        in this deck.
      </p>
      <button
        className="btn btn-primary mx-2 mt-4"
        type="button"
        onClick={addCardHandler}
      >
        Add Cards
      </button>
    </div>
  );
}

export default NotEnoughCards;