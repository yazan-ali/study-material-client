import React, { useState } from 'react';
import uuid from 'uuid/dist/v4';
import '../styles/addQuiz.css';
import Paper from "@material-ui/core/Paper";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2)
    },
    textField: {
        width: "100%",
    }
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function AddQuizForm(props) {

    const classes = useStyles();

    const [failMsg, setFailMsg] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false);

    const [quizData, setQuizData] = useState({
        question: "",
        answer1: "",
        answer2: "",
        answer3: "",
        answer4: "",
        correctAnswer: "",
    });

    const handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            setSnackBarOpen(false);
        }
        setSnackBarOpen(false);
    };

    const handleChange = (evt) => {
        setQuizData({ ...quizData, [evt.target.name]: evt.target.value })
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const quiz = {
            question: quizData.question.trim(),
            answersOptions: [
                { answerText: quizData.answer1.trim() },
                { answerText: quizData.answer2.trim() },
                { answerText: quizData.answer3.trim() },
                { answerText: quizData.answer4.trim() }
            ],
            correctAnswer: quizData.correctAnswer.trim(),
        };

        const answers = [quizData.answer1.trim(), quizData.answer2.trim(), quizData.answer3.trim(), quizData.answer4.trim()]
        if (answers.includes(quiz.correctAnswer)) {
            props.addNewQuestion({ ...quiz, id: uuid() });
            quizData.question = "";
            quizData.answer1 = "";
            quizData.answer2 = "";
            quizData.answer3 = "";
            quizData.answer4 = "";
            quizData.correctAnswer = "";
        } else {
            setSnackBarOpen(true);
        }
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
                <Snackbar open={snackBarOpen} autoHideDuration={5000} onClose={handleSnackBarClose}>
                    <Alert onClose={handleSnackBarClose} severity="error">
                        correct answer must match one of the answers options
                    </Alert>
                </Snackbar>
            </Paper>
        </Container>
    );
}

export default AddQuizForm