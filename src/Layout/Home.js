import React from "react";
import { useHistory } from "react-router-dom";

function Home() {
    let history = useHistory();
    function handleCreateDeck(e) {
        e.preventDefault();
        history.push("/decks/new");
    }

    return (
        <div>
            <button type= "button" className="btn btn-secondary" onClick={handleCreateDeck}/>
        </div>
    )
}

export default Home;