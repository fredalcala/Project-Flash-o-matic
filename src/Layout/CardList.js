import React from "react";
import CardFace from "./CardFace";

function CardList({cards}){
    const cardList = cards.map((card)=> {
        return (<CardFace card={card} key={card.id} />)
    })

    return (
        <div>
            {cardList}
        </div>
    )
}

export default CardList;