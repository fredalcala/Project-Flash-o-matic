import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import {createDeck} from "../utils/api";


//form after hitting Create Deck on Homepage
function DeckCreate() {
  const history = useHistory();
  const [newDeck, setNewDeck] = useState({
    name: "",
    description: "",
  });

  function nameChangeHandler(event) {
    setNewDeck({ ...newDeck, name: event.target.value });
  }
  function textChangeHandler(event) {
    setNewDeck({ ...newDeck, description: event.target.value });
  }

  async function handleCreate(event) {
    event.preventDefault();
    const createdDeck = await createDeck(newDeck);
    history.push(`/decks/${createdDeck.id}`);
  }


  return (
    <div>
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Create Deck
            </li>
          </ol>
        </nav>
      </div>
      <h1>Create Deck</h1>
      <form>
        <label htmlFor="name">
          Name
          <input
            id="name"
            type="text"
            placeholder="Deck Name"
            onChange={nameChangeHandler}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            type="text"
            rows={5}
            placeholder="Description of the deck"
            onChange={textChangeHandler}
          />
        </label>
        <button onClick={()=>{history.push(`/`)}} className="btn btn-secondary" >
          Cancel
        </button>
        <button onClick={handleCreate} className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
}

export default DeckCreate;