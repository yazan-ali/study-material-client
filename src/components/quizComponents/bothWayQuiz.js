import React, { useState } from 'react';
import AppBar from '../appBar';
import '../styles/quiz.css';
import UpVoteButton from './upVoteButton';
import DownVoteButton from './downVoteButton';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';

function BothWayQuiz({ quiz: { id, questions, course_name, number_of_questions, up_votes, down_votes }, user }) {
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
        setShowCorrectAnswers(true);
        addParticipant();
        window.scrollTo(0, 0)

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
                        {
                            (
                                questions.map((q, idx) => (
                                    showCorrectAnswers && <div className="question-container">
                                        <div className="question">
                                            <h5>{`Question ${idx + 1} of ${number_of_questions}`}</h5>
                                            <h3>{q.question}</h3>
                                        </div>
                                        <div className="answers">
                                            {q.answersOptions.map((answer, i) => (
                                                < div className="option">
                                                    {answer.answerText &&
                                                        <div>
                                                            <label className="answerLabel" for={`answer${idx}${i + 1}`}>{`${symbols[i]}: ${answer.answerText}`}
                                                                <input checked={answers[idx] === answer.answerText} type="radio" id={`answer${idx}${i + 1}`} name={idx} value={answer.answerText} />
                                                                <span className="checkmark"></span>
                                                                <span style={{ marginLeft: 10 }}>{q.correctAnswer === answer.answerText && <CheckRoundedIcon style={{ color: "green" }} />}</span>
                                                            </label>
                                                        </div>
                                                    }
                                                </div>
                                            ))}
                                        </div>
                                    </div >
                                ))
                            )
                        }
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