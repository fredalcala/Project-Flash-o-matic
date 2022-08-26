import React, {useEffect} from "react";
import {listDecks, deleteDeck} from "../utils/api";
import DeckFace from "./DeckFace";


//listing decks on homepage
function DeckList({decks, setDecks, setDeck}){
    useEffect(()=> {
        async function renderDecks(){
const loadedDecks = await listDecks();
setDecks(loadedDecks);
        }
        renderDecks();
    }, [setDecks]);

    async function deleteHandler(id) {
        try{
        window.confirm(
          "Delete deck? You will not be able to recover it."
        ) && await deleteDeck(id);
       setDecks(await listDecks());
      } catch (error){
        throw error;
      }
    }

    const deckList = decks.map(deck => {
        return (<DeckFace deck={deck} key={deck.id} deleteHandler={()=>deleteHandler(deck.id)}/>)
    })
    return (
        <div>
            {deckList}
        </div>
    )
}

export default DeckList;