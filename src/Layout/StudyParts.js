import React from "react";
import {useHistory} from "react-router-dom";

const [study, setStudy] = {
    cards: [],
    currentCard: 0,
    cardMax: 0,
    front: true,
    flipped: false,
};

export function flip(){
    setStudy({...study, front: !study.front, flipped: true,});
}

export function whichSide(){
    const frontCard= study.cards[study.currentCard].front;
    const backCard= study.cards[study.currentCard].back;
    return study.front ? frontCard : backCard;
}

export function atMax(){
    return study.currentCard >= study.cardMax - 1;
}

export function cardsLeft(){
    return `${study.currentCard + 1} of ${study.cardMax}`;
}

export function ifNext(){
    return study.flipped ? (
        <button className="btn-primary btn" onClick={NextCard}>Next</button>
    ) : null;
}

export function NextCard(){
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