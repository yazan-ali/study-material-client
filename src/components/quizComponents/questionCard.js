import React, { useState } from 'react';
import '../styles/addQuiz.css';
import Paper from "@material-ui/core/Paper";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
    },
    textField: {
        width: "100%",
    }
}));

function QuestionCard(props) {

    const classes = useStyles();

    const [quizData, setQuizData] = useState({
        question: props.question,
        answer1: props.answers[0].answerText,
        answer2: props.answers[1].answerText,
        answer3: props.answers[2].answerText,
        answer4: props.answers[3].answerText,
        correctAnswer: props.correctAnswer
    });

    const [isEditing, setIsEditing] = useState(false);

    const symbols = ["a", "b", "c", "d"];

    const handleChange = (evt) => {
        setQuizData({ ...quizData, [evt.target.name]: evt.target.value })
    }

    //  to toggle edit form
    const showEditForm = () => {
        setIsEditing(!isEditing);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const quiz = {
            question: quizData.question,
            answersOptions: [
                { answerText: quizData.answer1 },
                { answerText: quizData.answer2 },
                { answerText: quizData.answer3 },
                { answerText: quizData.answer4 }
            ],
            correctAnswer: quizData.correctAnswer,
        };
        showEditForm();
        props.editQuestion(props.id, quiz);
    }

    const deleteQuestion = () => {
        props.deleteQuestion(props.id);
    }

    return (
        <div>
            <Container style={{ margin: "15px 0" }} maxWidth="md">
                {
                    isEditing ? (
                        // if editing show the edit form
                        <Paper className={classes.paper} elevation={3}>
                            <form onSubmit={handleSubmit}>
                                <h3>Question Text :</h3>
                                <TextField
                                    className={classes.textField}
                                    id="filled-search"
                                    label="Question"
                                    required={true}
                                    variant="filled"
                                    name="question"
                                    onChange={handleChange}
                                    value={quizData.question}
                                />
                                <h3>Answer Options :</h3>
                                <TextField
                                    className={classes.textField}
                                    id="filled-search"
                                    label="option a"
                                    variant="filled"
                                    name="answer1"
                                    onChange={handleChange}
                                    value={quizData.answer1}
                                />
                                <TextField
                                    className={classes.textField}
                                    id="filled-search"
                                    label="option b"
                                    variant="filled"
                                    name="answer2"
                                    onChange={handleChange}
                                    value={quizData.answer2}
                                />
                                <TextField
                                    className={classes.textField}
                                    id="filled-search"
                                    label="option c"
                                    variant="filled"
                                    name="answer3"
                                    onChange={handleChange}
                                    value={quizData.answer3}
                                />
                                <TextField
                                    className={classes.textField}
                                    id="filled-search"
                                    label="option d"
                                    variant="filled"
                                    name="answer4"
                                    onChange={handleChange}
                                    value={quizData.answer4}
                                />
                                <h3>Correct Answer :</h3>
                                <TextField
                                    className={classes.textField}
                                    id="filled-search"
                                    label="correct answer"
                                    variant="filled"
                                    required={true}
                                    name="correctAnswer"
                                    onChange={handleChange}
                                    value={quizData.correctAnswer}
                                />
                                <button style={{ marginRight: "5px" }} className="addQuiz-paperBtn" type="submit">Edit Question</button>
                                <button onClick={showEditForm} className="addQuiz-paperBtn">Cancel</button>
                            </form>
                        </Paper>
                    ) :
                        // if not editing show the question card
                        (
                            <div className="addQuiz-question-container">
                                <div className="addQuiz-question">
                                    <h3>{`Question ${props.questionNumber}`}</h3>
                                    <h3>{props.question}</h3>
                                    <div style={{ display: "flex" }}>
                                        <form onSubmit={deleteQuestion}>
                                            <button style={{ width: "90px", marginRight: "5px" }} className="addQuiz-Btn">Delete</button>
                                        </form>
                                        <button style={{ width: "90px", marginRight: "5px" }} className="addQuiz-Btn" onClick={showEditForm}>Edit</button>
                                    </div>
                                </div>
                                <div className="addQuiz-answer">
                                    {props.answers.map((answer, i) => (
                                        answer.answerText && < div className="addQuiz-option">
                                            <h4>{`${symbols[i]}: ${answer.answerText}`}</h4>
                                        </div>
                                    ))}
                                    <h3>{`correct ansewr : ${props.correctAnswer}`}</h3>
                                </div>
                            </div >
                        )
                }
            </Container>
        </div>
    );
}

export default QuestionCard