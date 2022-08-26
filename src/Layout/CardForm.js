import React from "react";
import { useHistory, Link, useParams } from "react-router-dom";

function CardForm({
  card,
  deck,
  submitHandler,
  frontChangeHandler,
  backChangeHandler,
  createHandler,
}) {
  const history = useHistory();
  const {deckId, cardId} = useParams();

  return (
    <div>
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {card.id ? `Edit Card #${cardId}` : `${deck.name}: Add Card`}
            </li>
          </ol>
        </nav>
      </div>
      <h3>{card.id ? "Edit Card" : `${deck.name}: Add Card`}</h3>
      <form onSubmit={submitHandler}>
        <label htmlFor="front">
          Front
          <textarea
            id="front"
            type="text"
            onChange={frontChangeHandler}
            value={card.front}
            rows={4}
          />
        </label>
        <label htmlFor="back">
          Back
          <textarea
            id="back"
            type="text"
            onChange={backChangeHandler}
            value={card.back}
            rows={4}
          />
        </label>
        {card.id ? (
          <div>
            <button
              onClick={() => {
                history.push(`/decks/${card.deckId}`);
              }}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        ) : (
          <div>
            <button
              onClick={() => {
                history.push(`/decks/${deckId}`);
              }}
              className="btn btn-secondary"
            >
              Done
            </button>
            <button onClick={createHandler} className="btn btn-primary">
              Save
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default CardForm;
