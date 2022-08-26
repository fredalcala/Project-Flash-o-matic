import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function StudyView({ card, studyIndex, cardsLength, setStudyIndex }) {
  const history = useHistory();

  const [front, setFront] = useState(true);
  const [finalCard, setFinalCard] = useState(false);

  function flipHandler() {
    if (studyIndex === cardsLength - 1) {
      setFinalCard(true);
    } else setFront(!front);
  }

  function nextCard() {
    setStudyIndex(studyIndex + 1);
  }

  function restart() {
    window.confirm("Would you like to restart?")
      ? setStudyIndex(0)
      : history.push("/");
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5>
          Card {(studyIndex + 1)} of {cardsLength}
        </h5>
        {front ? <p>{card.front}</p> : <p>{card.back}</p>}
        <button className="btn btn-secondary" onClick={flipHandler}>
          Flip
        </button>
        {!front && 
          <button className="btn btn-primary" onClick={nextCard}>
            Next
          </button>
        }
        {finalCard && 
          <button className="btn btn-primary" onClick={restart}>
            Restart
          </button>
        }
      </div>
    </div>
  );
}

export default StudyView;