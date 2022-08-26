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
        <div className="d-flex my-4">
        <label htmlFor="name" className="mx-2">
          Name
          <input
            id="name"
            type="text"
            placeholder="Deck Name"
            onChange={nameChangeHandler}
            className="form-control mt-2"
          />
        </label>
        <label htmlFor="description" className="mx-2">
          Description
          <textarea
            id="description"
            type="text"
            placeholder="Description of the deck"
            onChange={textChangeHandler}
            className="form-control mt-2"
          />
        </label>
        </div>
        <div className="pt-2">
        <button onClick={()=>{history.push(`/`)}} className="btn btn-secondary mx-2" >
          Cancel
        </button>
        <button onClick={handleCreate} className="btn btn-primary mx-2">
          Create
        </button>
        </div>
      </form>
    </div>
  );
}

export default DeckCreate;