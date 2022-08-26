import React, {useEffect, useState} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import {readDeck} from "../utils/api";
//import {flip, whichSide, atMax, cardsLeft, ifNext} from "./StudyParts";
import  NotEnoughCards from "./NotEnoughCards";

function Study() {
    const {deckId} = useParams();
    const [deck, setDeck] = useState({});
    const [study, setStudy] = useState({
        cards: [],
        currentCard: 0,
        cardMax: 0,
        front: true,
        flipped: false,
    });

    useEffect(()=> {
        const abortController = new AbortController();
        async function loadDecks(){
            try{
            const deckLoad = await readDeck(deckId, abortController.signal);
            setDeck(deckLoad);
            setStudy({
                currentCard: 0,
                front: true,
                flipped: false,
                cards: deckLoad.cards,
                cardMax: deckLoad.cards.length,
            })} catch (error) {
                console.log(error.message);
            };
        }
        loadDecks();
        return () => {
            console.log("Aborting");
            abortController.abort();
        }
    }, [deckId]);
    if (!deck){
        return <p>Loading...</p>
    }

    if(study.cards.length < 3){
        return <NotEnoughCards deck={deck}/>
    }

    function flip(){
        setStudy({...study, front: !study.front, flipped: true,});
    }
    
    function whichSide(){
        const frontCard= study.cards[study.currentCard].front;
        const backCard= study.cards[study.currentCard].back;
        return study.front ? frontCard : backCard;
    }
    
    function atMax(){
        return study.currentCard >= study.cardMax - 1;
    }
    
    function cardsLeft(){
        return `${study.currentCard + 1} of ${study.cardMax}`;
    }
    
    function ifNext(){
        return study.flipped ? (
            <button className="btn-primary btn" onClick={NextCard}>Next</button>
        ) : null;
    }

    function NextCard(){
        const history = useHistory();
        if (atMax()) {
            if (window.confirm("Restart Deck?")){
                setStudy({
                    ...study,
                    currentCard: 0,
                    flipped: false,
                    front: true,
                });
            } else{
                history.push("/");
            }
        } else{
            setStudy({
                ...study,
                currentCard: study.currentCard + 1,
                flipped: false,
                front: true,
            });
        }
    }

return(
    <div className="container">
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
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
        <div className="card">
            <div className="card-body">
                <h5>Card {cardsLeft}</h5>
                <p className="card-text">{whichSide}</p>
                <button className="btn btn-secondary" onClick={flip}>
                    Flip
                </button>
                {ifNext}
            </div>
        </div>
    </div>
)

}


export default Study;