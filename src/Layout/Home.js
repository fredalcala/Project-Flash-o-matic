import React from "react";
import { useHistory } from "react-router-dom";
import DeckList from "./DeckList";

function Home({decks, setDecks, setDeck}) {
    let history = useHistory();
    function handleCreateDeck(e) {
        e.preventDefault();
        history.push("/decks/new");
    }

    return (
        <div>
            <button type= "button" className="btn btn-secondary mx-2 mb-2" onClick={handleCreateDeck}>
            Create Deck
            </button>
            <DeckList decks={decks} setDecks={setDecks} setDeck={setDeck} />
        </div>
    )
}

export default Home;