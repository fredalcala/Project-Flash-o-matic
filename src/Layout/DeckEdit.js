import React, {useState, useEffect} from "react";
import {useParams, useHistory, Link} from "react-router-dom";
import { updateDeck } from "../utils/api";
import {readDeck} from "../utils/api";


//deck edit form in DeckView after clicking edit
function DeckEdit(){
    const history= useHistory();
    const [deck, setDeck] = useState();
    const {deckId} = useParams();

    useEffect(()=> {
        async function loadDecks(){
            const currDeck = await readDeck(deckId);
            setDeck(currDeck);
        }
        loadDecks();

    }, [deckId, setDeck]);

    if(!deck){
        return <h1>Loading...</h1>
    }

    function nameChangeHandler(event) {
        setDeck({...deck, name: (event.target.value)});
    }
    function textChangeHandler(event) {
        setDeck({...deck, description: (event.target.value)});
    }

    function cancelHandler(event) {
        event.preventDefault();
        history.push(`/decks/${deck.id}`);
      }

      async function submitHandler(event){
        event.preventDefault();
        await updateDeck(deck);
        history.push(`/decks/${deck.id}`)
    }

    return (
        <div>
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
                        <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Edit</li>
                    </ol>
                </nav>
            </div>
            <h1>Edit Deck</h1>
            <form onSubmit={submitHandler}>
                <label htmlFor="name">
                    <input
                    id="name"
                    type="text"
                    onChange={nameChangeHandler}
                    value={deck.name}
                    />
                </label>
                <label htmlFor="description">
                    <input
                    id="description"
                    type="text"
                    onChange={textChangeHandler}
                    rows={5}
                    value={deck.description}
                    />
                </label>
<button onClick={cancelHandler} className="btn btn-secondary">
    Cancel
</button>
<button type="submit" className="btn btn-primary">
    Save
</button>
            </form>
        </div>
    )
}

export default DeckEdit;