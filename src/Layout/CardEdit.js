import React, {useEffect, useState} from "react";
import {useParams, useHistory} from "react-router-dom";
import {updateCard, readCard, readDeck} from "../utils/api";
import CardForm from "./CardForm";

function CardEdit({deck, setDeck}){
    const history= useHistory();
    const [card, setCard]= useState({});
    const {deckId, cardId}= useParams();

    useEffect(()=> {
        const abortController = new AbortController();
        async function loadInfo(){
            try{
            const currDeck = await readDeck(deckId, abortController.signal);
            const currCard = await readCard(cardId);
            await setDeck(currDeck);
            setCard(currCard)
        } catch (error){
            if(error.name === "AbortError"){
                console.log("Aborted")
            } else throw error
        }
    }
        loadInfo();
        return ()=> abortController.abort();
    }, [cardId, setCard, deckId, setDeck]);


    function frontChangeHandler(event){
        setCard({...card, front: (event.target.value)});
        
    }

    function backChangeHandler(event){
        setCard({...card, back: (event.target.value)});
    }


      async function submitHandler(event){
        event.preventDefault();
           await updateCard(card);
           history.push(`/decks/${deckId}`)
    }

      return (
      <CardForm card={card} deck={deck} submitHandler={submitHandler} 
      backChangeHandler={backChangeHandler} frontChangeHandler={frontChangeHandler} />

      )

}

export default CardEdit;