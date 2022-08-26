import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { deleteDeck, readDeck } from "../utils/api";
//import Study from "./Study";
import CardList from "./CardList";


//view after clicking "view" on a deck from homepage
function DeckView() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState();

  useEffect(() => {
    const abortController = new AbortController();
    async function fetchDecks() {
      try {
        const apiDecks = await readDeck(deckId, abortController.signal);
        setDeck(apiDecks);
      } catch (err) {
        if (err.name !== "AbortError") {
          throw err;
        }
      }
    }
    fetchDecks();
    return () => abortController.abort();
  }, [deckId]);

  async function deleteHandler(deckId) {
    const confirm = window.confirm(
      "Delete deck? You will not be able to recover it."
    );
    if (confirm) {
      await deleteDeck(deckId);
      history.push("/");
    }
  }

  if (!deck) {
    return <h3>Loading...</h3>;
  }

  return (
    <>
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breakcrumb-item active" aria-current="page">
              {deck.name}
            </li>
          </ol>
        </nav>
      </div>
      <div className="card">
        <div className="card-body text-center">
          <h3 className="card-title">{deck.name}</h3>
          <p className="card-text">{deck.description}</p>
        </div>
        <div className="card-body">
          <p>{deck.description}</p>
          <div className="d-flex justify-content-around">
            <div>
              <Link to={`/decks/${deck.id}/edit`}>
                <button
                  className="btn btn-secondary"
                  onClick={() => history.push(`/decks/${deck.id}/edit`)}
                >
                  Edit
                </button>
              </Link>
              <Link to={`/decks/${deck.id}/study`}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => history.push(`/decks/${deck.id}/study`)}
                >
                  Study
                </button>
              </Link>
              <Link to={`/decks/${deck.id}/cards/new`}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => history.push(`/decks/${deck.id}/cards/new`)}
                >
                  Add Cards
                </button>
              </Link>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger"
                onClick={()=> deleteHandler(deckId)}
              >
                Delete Deck
              </button>
            </div>
          </div>
        </div>
      </div>
      <br />
      <h1>Cards</h1>
      <CardList cards={deck.cards} key={deck.id} />
    </>
  );
}

export default DeckView;
