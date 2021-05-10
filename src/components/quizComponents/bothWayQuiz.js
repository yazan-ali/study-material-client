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

    const handleSubmit = (evt) => {
        evt.preventDefault();
        let result = 0;
        const currentAnswer = [
            answers.answer1, answers.answer2, answers.answer3, answers.answer4, answers.answer5,
            answers.answer6, answers.answer7, answers.answer8, answers.answer9, answers.answer10,
            answers.answer11, answers.answer12, answers.answer13, answers.answer14, answers.answer15,
            answers.answer16, answers.answer17, answers.answer18, answers.answer19, answers.answer20,
            answers.answer21, answers.answer22, answers.answer23, answers.answer24, answers.answer25,
            answers.answer26, answers.answer27, answers.answer28, answers.answer29, answers.answer30,
            answers.answer31, answers.answer32, answers.answer33, answers.answer34, answers.answer35,
            answers.answer36, answers.answer37, answers.answer38, answers.answer39, answers.answer40,
            answers.answer41, answers.answer42, answers.answer43, answers.answer44, answers.answer45,
            answers.answer46, answers.answer47, answers.answer48, answers.answer49, answers.answer50,
            answers.answer51, answers.answer52, answers.answer53, answers.answer54, answers.answer55,
            answers.answer56, answers.answer57, answers.answer58, answers.answer59, answers.answer60,
            answers.answer61, answers.answer62, answers.answer63, answers.answer64, answers.answer65,
            answers.answer66, answers.answer67, answers.answer68, answers.answer69, answers.answer70,
            answers.answer71, answers.answer72, answers.answer73, answers.answer74, answers.answer75,
            answers.answer76, answers.answer77, answers.answer78, answers.answer79, answers.answer80,
            answers.answer81, answers.answer82, answers.answer83, answers.answer84, answers.answer85,
            answers.answer86, answers.answer87, answers.answer88, answers.answer89, answers.answer90,
            answers.answer91, answers.answer92, answers.answer93, answers.answer94, answers.answer95,
            answers.answer96, answers.answer97, answers.answer99, answers.answer99, answers.answer100,

        ];
        for (let i = 0; i < number_of_questions; i++) {
            if (!currentAnswer[i]) {
                currentAnswer[i] = ""
            }
            if (currentAnswer[i].toLowerCase() === questions[i].correctAnswer.toLowerCase()) {
                result++;
            }
        }
        setScore(result);
        setShowScore(true);
        addParticipant();
    }

    const handleChange = (evt) => {
        setAnswers({ ...answers, [evt.target.name]: evt.target.value });
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
                                                                <input onChange={handleChange} type="radio" id={`answer${idx}${i + 1}`} name={`answer${idx + 1}`} value={answer.answerText} />
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