import React from "react";
import { Link, useHistory } from "react-router-dom";


//front view of decks on homepage
function DeckFace({ deck, deleteHandler }) {
    const history = useHistory();

  return (
    <div className="card my-2">
      <div className="card-body">
        <div className="d-flex justify-content-between">
        <h5 className="card-title">{deck.name}</h5>
        <p className="text-secondary">{`${deck.cards.length} cards`}</p>
        </div>
        <p className="card-text ml-2">{deck.description}</p>
        <div className="d-flex justify-content-between">
          <div>
            <Link to={`/decks/${deck.id}`}>
                <button 
                type="button"
                className="btn btn-secondary mx-2"
                onClick={(deck)=> history.push(`/decks/${deck.id}`)}>
                    View
                </button>
                </Link>
            <Link to={`/decks/${deck.id}/study`}>
              <button
                type="button"
                className="btn btn-primary mx-2"
                onClick={(deck) => history.push(`/decks/${deck.id}/study`)}
              >
                Study
              </button>
            </Link>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-danger mx-2"
              onClick={deleteHandler}
            >
              Delete Deck
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeckFace;
