import React, { useState } from 'react';
import AppBar from '../appBar';
import '../styles/quiz.css';
import UpVoteButton from './upVoteButton';
import DownVoteButton from './downVoteButton';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

function BothWayQuiz({ quiz: { id, questions, course_name, number_of_questions, up_votes, down_votes, up_votes_counts, down_votes_counts }, user }) {
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [answers, setAnswers] = useState({});
    const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);

    const symbols = ["a", "b", "c", "d"];

    const [addParticipant] = useMutation(PARTICIPANTS, {
        variables: { quizId: id },
    });

    const handleChange = (evt) => {
        setAnswers({ ...answers, [evt.target.name]: evt.target.value });
        console.log(answers)
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        let result = 0;

        for (let key in answers) {
            if (answers[key].toLowerCase() === questions[key].correctAnswer.toLowerCase()) {
                result++;
            }
        }

        setScore(result);
        setShowScore(true);
        addParticipant();
    }


    const retyQuiz = () => {
        setScore(0);
        setAnswers({ ..."" });
        setShowCorrectAnswers(false);
        setShowScore(false);
    }

    const showAnswers = () => {
        setShowCorrectAnswers(true);
    }

    return (
        < div className="root" >
            <AppBar backgroundColor={"#4A156B"} />
            {course_name && <h1 className="course_name">{`${course_name} quiz`}</h1>}
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
                                </div>) :
                                (
                                    questions.map((q, idx) => (
                                        <div className="question-container">
                                            <div className="question">
                                                <h5>{`Question ${idx + 1} of ${number_of_questions}`}</h5>
                                                <h3>{q.question}</h3>
                                            </div>
                                            <div className="answers">
                                                {q.answersOptions.map((answer, i) => (
                                                    < div className="option">
                                                        {answer.answerText &&
                                                            <label className="answerLabel" for={`answer${idx}${i + 1}`}>{`${symbols[i]}: ${answer.answerText}`}
                                                                <input onChange={handleChange} type="radio" id={`answer${idx}${i + 1}`} name={idx} value={answer.answerText} />
                                                                <span class="checkmark"></span>
                                                            </label>
                                                        }
                                                    </div>
                                                ))}
                                            </div>
                                        </div >
                                    ))
                                )
                        }
                        {
                            !showScore && (
                                <form onSubmit={handleSubmit}>
                                    <button type="submit" class="submitBtn" >Submit</button>
                                </form>
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
        </div>

    );
}

const PARTICIPANTS = gql`
    mutation quizParticipants($quizId: ID!){
        quizParticipants(quizId: $quizId){
            id
        }
    }
`;

export default BothWayQuiz;