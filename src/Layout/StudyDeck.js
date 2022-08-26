import React, {useEffect, useState} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import {readDeck} from "../utils/api";
//import notEnoughCards from "./NotEnoughCards";

function StudyDeck() {
    const history = useHistory();
    const {deckId} = useParams();
    const [deck, setDeck] = useState({});
    const [studyDeck, setStudyDeck] = useState({
        cards: [],
        currentCard: 0,
        cardMax: 0,
        front: true,
        flipped: false,
    });

    useEffect(()=> {
        async function loadDecks(){
            const deckLoad = await readDeck(deckId);
            setDeck(deckLoad);
            setStudyDeck({
                currentCard: 0,
                front: true,
                flipped: false,
                cards: deckLoad.cards,
                cardMax: deckLoad.cards.length,
            });
        }
        loadDecks();
    }, [deckId]);
    
}