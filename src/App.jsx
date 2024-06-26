import React from 'react';
import { decode } from 'html-entities';
import { nanoid } from 'nanoid';
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import QuizSubmit from "./components/QuizSubmit";
import leftBlob from "./assets/left-blob.png";
import rightBlob from "./assets/right-blob.png";
import questionData from "../data.js";
import './App.css';

function App() {

    const [quizStarted, toggleQuizStarted] = React.useState(false);
    const [quizSubmitted, toggleQuizSubmitted] = React.useState(false);
    const [arrayOfQuestionsAndAnswers, changeQuestionsArray] = React.useState([]);

    React.useEffect(() => {
        function shuffleAnswers(arrayOfAnswers) {
            return arrayOfAnswers.sort(() => Math.random() - 0.5);
        };
        if (quizStarted) {
            fetch("https://opentdb.com/api.php?amount=5&type=multiple")
                .then(response => response.json())
                .then(questionData => {
                    // If the API call isn't responding, comment out lines 23-25 & 54 to execute the code using data.js
                    const tempArrayOfQuestionsAndAnswers = [];
                    questionData.results.forEach(questionObj => {
                        const questionObject = {};
                        const arrayOfAnswers = [];
                        arrayOfAnswers.push(
                            {
                                answer: decode(questionObj.correct_answer),
                                id: nanoid(),
                                isCorrect: true,
                                isSelected: false
                            }
                        );
                        questionObj.incorrect_answers.forEach(incorrectAnswer => {
                            arrayOfAnswers.push(
                                {
                                    answer: decode(incorrectAnswer),
                                    id: nanoid(),
                                    isCorrect: false,
                                    isSelected: false
                                }
                            )
                        });
                        questionObject.question = decode(questionObj.question);
                        questionObject.answers = shuffleAnswers(arrayOfAnswers);
                        tempArrayOfQuestionsAndAnswers.push(questionObject);
                    });
                    changeQuestionsArray(tempArrayOfQuestionsAndAnswers);
                });
        }
    }, [quizStarted]);
    
    const questionElement = arrayOfQuestionsAndAnswers.map(questionObj => {
        return <Question 
            key = {questionObj.question}
            question = {questionObj.question}
            answers = {questionObj.answers}
            selectAnswerFunction = {selectAnswerFunction}
            quizSubmitted = {quizSubmitted}
        />
    });

    function startQuiz() {
        toggleQuizStarted(!quizStarted);
        quizSubmitted && toggleQuizSubmitted(false);
    };

    function submitQuiz() {
        toggleQuizSubmitted(!quizSubmitted);
    };

    function selectAnswerFunction(event) {
        changeQuestionsArray(previousQuestionsArray => {
            return previousQuestionsArray.map(questionObj => {
                // If doesQuestionContainSelectedAnswer is not true, that question will remain unchanged
                function doesQuestionContainSelectedAnswer(question) {
                    for (let i = 0; i < question.answers.length; i++) {
                        if (Object.values(question.answers[i]).includes(event.target.id)) {
                            return true;
                        };
                    };
                };
                return {
                    ...questionObj,
                    answers: doesQuestionContainSelectedAnswer(questionObj) 
                        ? questionObj.answers.map(answer => {
                            return {
                                ...answer,
                                isSelected: event.target.id === answer.id ? true : false
                            };
                        }) 
                        : questionObj.answers
                };
            });
        });
    };

    return (
        <main className={quizStarted ? "main-container" : "main-container main-container-height"}>
            <img src={leftBlob} className="left-blob"/>
            <img src={rightBlob} className="right-blob"/>
            {!quizStarted 
                && <StartScreen 
                    startQuiz={startQuiz}
                />
            }
            {quizStarted && <>
                {questionElement}
                <QuizSubmit 
                    startQuiz = {startQuiz}
                    submitQuiz = {submitQuiz}
                    quizSubmitted = {quizSubmitted}
                    arrayOfQuestionsAndAnswers = {arrayOfQuestionsAndAnswers}
                />
            </>}
        </main>
    );
};

export default App;


