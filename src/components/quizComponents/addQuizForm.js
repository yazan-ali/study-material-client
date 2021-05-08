import React, { useState } from 'react';
import uuid from 'uuid/dist/v4';
import '../styles/addQuiz.css';
import Paper from "@material-ui/core/Paper";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2)
    },
    textField: {
        width: "100%",
    }
}));

function AddQuizForm(props) {

    const classes = useStyles();

    const [quizData, setQuizData] = useState({
        question: "",
        answer1: "",
        answer2: "",
        answer3: "",
        answer4: "",
        correctAnswer: "",
    });

    const handleChange = (evt) => {
        setQuizData({ ...quizData, [evt.target.name]: evt.target.value })
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
        props.addNewQuestion({ ...quiz, id: uuid() });
        quizData.question = "";
        quizData.answer1 = "";
        quizData.answer2 = "";
        quizData.answer3 = "";
        quizData.answer4 = "";
        quizData.correctAnswer = "";
    }

    return (
        <Container maxWidth="md">
            <Paper className={classes.paper} elevation={3}>
                <form onSubmit={handleSubmit}>
                    <h3>Question Text :</h3>
                    <TextField
                        className={classes.textField}
                        required={true}
                        id="Question"
                        label="Question"
                        variant="filled"
                        name="question"
                        onChange={handleChange}
                        value={quizData.question}
                    />
                    <h3>Answer Options :</h3>
                    <TextField
                        className={classes.textField}
                        id="option a"
                        label="option a"
                        defaultValue=""
                        variant="filled"
                        name="answer1"
                        onChange={handleChange}
                        value={quizData.answer1}
                        required
                    />
                    <TextField
                        className={classes.textField}
                        id="option b"
                        label="option b"
                        defaultValue=""
                        variant="filled"
                        name="answer2"
                        onChange={handleChange}
                        value={quizData.answer2}
                        required
                    />
                    <TextField
                        className={classes.textField}
                        id="filled-search"
                        label="option c"
                        defaultValue=""
                        variant="filled"
                        name="answer3"
                        onChange={handleChange}
                        value={quizData.answer3}
                    />
                    <TextField
                        className={classes.textField}
                        id="filled-search"
                        label="option d"
                        defaultValue=""
                        variant="filled"
                        name="answer4"
                        onChange={handleChange}
                        value={quizData.answer4}
                    />
                    <h3>Correct Answer :</h3>
                    <TextField
                        className={classes.textField}
                        required={true}
                        id="correct answer"
                        label="correct answer"
                        defaultValue=""
                        variant="filled"
                        name="correctAnswer"
                        onChange={handleChange}
                        value={quizData.correctAnswer}
                    />
                    <button className="addQuiz-paperBtn" type="submit">Add Question</button>
                </form>
            </Paper>
        </Container>
    );
}

export default AddQuizForm