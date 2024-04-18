import React from "react";
import "./Question.css";

function Question(props) {

    function setClassName(checkIfSubmitted, checkIfSelected, checkIfCorrect) {
        let className;

        if (checkIfSubmitted && checkIfSelected && !checkIfCorrect) {
            className = "incorrect-answer "
        } else if (checkIfSubmitted && !checkIfSelected && !checkIfCorrect) {
            className = "unselected-answer-submitted"
        } else if (checkIfSubmitted && checkIfCorrect) {
            className = "correct-answer"
        } else if (!checkIfSubmitted && checkIfSelected) {
            className = "selected-answer"
        }

        return className;
    }

    const liElement = props.answers.map(answerObj => {
        return <li 
            key = {answerObj.id}
            id = {answerObj.id}
            onClick = {(event) => props.selectAnswerFunction(event)}
            className = {setClassName(props.quizSubmitted, answerObj.isSelected, answerObj.isCorrect)}
            // className = {answerObj.isSelected ? "selected-answer" : ""}
        >
            {answerObj.answer}
        </li>
    })

    return (
        <div className="question-container">
            <h2>{props.question}</h2>
            <ul className="answer-choices-ul">
                {liElement}
            </ul>
        </div>
    )
};

export default Question;