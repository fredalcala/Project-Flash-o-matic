import React from "react";
import { deleteCard } from "../utils/api";
import { useHistory, Link } from "react-router-dom";

function CardFace({ card }) {
  const history = useHistory();

  /*function editHandler(){
    history.push(`/decks/${deck.id}/cards/${id}/edit`)
  }*/

  function deleteHandler(cardId) {
    const confirm = window.confirm(
      "Delete card? You will not be able to recover it."
    );
    if (confirm) {
      deleteCard(cardId);
      history.push(`/decks/${card.deckId}`);
      window.location.reload(false);
    }
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-subtitle">Front</h5>
        <p className="card-text">{card.front}</p>
        <h5 className="card-subtitle">Back</h5>
        <p className="card-text">{card.back}</p>
        <div>
            <Link to={`/decks/${card.deckId}/cards/${card.id}/edit`}>
            <button className="btn btn-secondary">Edit</button></Link>
          <button
            onClick={() => deleteHandler(card.id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardFace;