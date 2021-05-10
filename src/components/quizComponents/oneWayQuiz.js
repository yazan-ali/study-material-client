import React, { useState } from 'react';
import '../styles/quiz.css';
import AppBar from '../appBar';
import UpVoteButton from './upVoteButton';
import DownVoteButton from './downVoteButton';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

function OneWayQuizizz({ quiz: { id, questions, course_name, quiz_title, number_of_questions, isOneWay, up_votes, down_votes, up_votes_counts, down_votes_counts }, user }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [answer, setAnswer] = useState("");
    const [showScore, setShowScore] = useState(false);
    const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);

    const symbols = ["a", "b", "c", "d"];

    const [addParticipant] = useMutation(PARTICIPANTS, {
        variables: { quizId: id },
    });

    const handleSubmit = (evt) => {
        evt.preventDefault();
        document.querySelectorAll("INPUT[type='radio']").forEach(radio => {
            radio.checked = false
        })
        setAnswer("");
        if (answer.toLowerCase() === questions[currentQuestion].correctAnswer.toLowerCase()) {
            setScore(score + 1);
        }
        if (currentQuestion < number_of_questions - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
        else {
            setShowScore(true);
            addParticipant();
        }
    }

    const handleChange = (evt) => {
        setAnswer(evt.target.value);
    }

    const retyQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setAnswer("");
        setShowCorrectAnswers(false);
        setShowScore(false);
    }

    const showAnswers = () => {
        setShowCorrectAnswers(true);
    }


    return (
        <div style={{ height: "100vh" }} className={`root ${!showCorrectAnswers && 'rootJustify'}`}>
            <AppBar backgroundColor={"#4A156B"} />
            {
                questions && (
                    <div className="conatiner">
                        {
                            showScore ? (
                                <div className={`${showScore ? 'result' : 'question'}`}>
                                    <h1> {`Your final grade for this quiz is ${score}/${number_of_questions}`} </h1>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <UpVoteButton
                                                quizId={id}
                                                up_votes={up_votes}
                                                user={user}
                                            />
                                            <span>Up Vote</span>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <DownVoteButton
                                                quizId={id}
                                                down_votes={down_votes}
                                                user={user}
                                            />
                                            <span>Down Vote</span>
                                        </div>
                                    </div>
                                    <button onClick={retyQuiz} className="submitBtn">Rety</button>
                                    <button onClick={showAnswers} style={{ width: "auto" }} className="submitBtn">Show Correct Answers</button>
                                </div>
                            ) :
                                (
                                    <div className="question-container">
                                        <div className="question">
                                            <h4 style={{ marginBottom: "20px" }} className="course_name">{`${course_name} quiz`}</h4>
                                            <h5>{`Question ${currentQuestion + 1} of ${number_of_questions}`}</h5>
                                            <h3>{questions[currentQuestion].question}</h3>
                                            <form onSubmit={handleSubmit}>
                                                <button className="submitBtn" type="submit"> {currentQuestion < questions.length - 1 ? "Next" : "Finish"}</button>
                                            </form>
                                        </div>
                                        <div className="answers">
                                            {questions[currentQuestion].answersOptions.map((answer, i) => (
                                                < div className="option">
                                                    {
                                                        answer.answerText && <label className="answerLabel" for={`answer${i + 1}`}>{`${symbols[i]}: ${answer.answerText}`}
                                                            <input onChange={handleChange} type="radio" id={`answer${i + 1}`} name="answer" value={answer.answerText} />
                                                            <span class="checkmark"></span>
                                                        </label>
                                                    }
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                        }
                        {questions.map((q, i) => (
                            showCorrectAnswers && <div className="correct-answers-container">
                                <div className="correct-answers-question">
                                    <h3>
                                        {`Q ${i + 1} : ${q.question}`}
                                    </h3>
                                </div>
                                <div className="correct-answers">
                                    <p><span style={{ fontWeight: "600" }}>correct answer: </span>{q.correctAnswer}</p>
                                </div>
                            </div>
                        ))}
                    </div >
                )}
        </div >
    );
}

const PARTICIPANTS = gql`
    mutation quizParticipants($quizId: ID!){
        quizParticipants(quizId: $quizId){
            id
        }
    }
`;

export default OneWayQuizizz;