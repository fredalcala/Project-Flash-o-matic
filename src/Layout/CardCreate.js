import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";
import CardForm from "./CardForm";

function CardCreate({deck, setDeck}) {
  const history = useHistory();
  const { deckId } = useParams();
  const [createdCard, setCreatedCard] = useState({
    front: "",
    back: "",
    deckId: deckId,
  });

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDecks() {
        try{
      const currDeck = await readDeck(deckId, abortController.signal);
      await setDeck(currDeck);
    } catch (error){
        if (error.name === "AbortError"){
            console.log("Aborted")
        } else throw error;
    }
}
    loadDecks();
    return ()=> abortController.abort();
  }, [deckId, setDeck]);

  if (!deck) {
    return <h1>Loading...</h1>;
  }

  function frontChangeHandler(event) {
    setCreatedCard({ ...createdCard, front: event.target.value });
  }

  function backChangeHandler(event) {
    setCreatedCard({ ...createdCard, back: event.target.value });
  }

  function createHandler() {
      createCard(deckId, createdCard);
      setCreatedCard({front: "", back: "", deckId: deckId})
      history.push(`/decks/${deck.id}`);
  }

  async function submitHandler(event){
    event.preventDefault();
        if(createdCard.front === "" && createdCard.back === "") {
            history.push(`/decks/${deckId}`)
        }else {
            await createCard(deckId, createdCard);
            setCreatedCard({front: "", back: "", deckId: null})
            history.push(`/decks/${deckId}`)
        }
}

  return (
    <CardForm card={createdCard} deck={deck} backChangeHandler={backChangeHandler} 
    frontChangeHandler={frontChangeHandler} submitHandler={submitHandler}
    createHandler={createHandler} />
  );
}

export default CardCreate;
