import React from "react";
import "./QuizSubmit.css"

function QuizSubmit(props) {

    function countCorrectAnswers(questionAndAnswerProp) {
        let correctAnswerCount = 0;

        questionAndAnswerProp.forEach(questionObj => {
            questionObj.answers.forEach(answerObj => {
                if (answerObj.isCorrect && answerObj.isSelected) {
                    correctAnswerCount++
                }
            })
        })

        return correctAnswerCount
    }

    return (
        <div className="quiz-submit-container">
            {props.quizSubmitted && <p>You scored {countCorrectAnswers(props.arrayOfQuestionsAndAnswers)}/5 correct answers</p>}
            {props.quizSubmitted 
                ? <button onClick={props.startQuiz}>Play again</button> 
                : <button onClick={props.submitQuiz}>Check answers</button>
            }
        </div>
    )
};

export default QuizSubmit;