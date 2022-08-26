import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import NotEnoughCards from "./NotEnoughCards";
import StudyView from "./StudyView";

function Study({deck, setDeck}) {
//const cardsLength= deck.cards.length;
  const { deckId } = useParams();
  const [studyIndex, setStudyIndex] = useState(0);

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDecks() {
      try {
        const deckLoad = await readDeck(deckId, abortController.signal);
        setDeck(deckLoad);
      } catch (error) {
        if(error.name === "AbortError"){
            console.log("Aborted")
        } else throw error
      }
    }
    loadDecks();
  }, [deckId, setDeck]);

  if (!deck) {
    return <p>Loading...</p>;
  }

    return (
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>
        <h3>Study: {deck.name}</h3>
        {deck.cards && deck.cards.length > 2 &&
        <StudyView
        card={deck.cards[studyIndex]}
        studyIndex={studyIndex}
        cardsLength={deck.cards.length}
        key={studyIndex}
        setStudyIndex={setStudyIndex}/>}

        {deck.cards && deck.cards.length <=2 && <NotEnoughCards deck={deck}/>}
        </div>
    );
}

export default Study;
