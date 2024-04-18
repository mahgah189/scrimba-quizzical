import React from "react";
import "./StartScreen.css";

function StartScreen(props) {
    return (
        <div className="start-screen">
            <h1>Quizzical</h1>
            <p>Test your knowledge 🧙‍♂️</p>
            <button onClick={props.startQuiz}>Start quiz</button>
        </div>
    )
};

export default StartScreen;