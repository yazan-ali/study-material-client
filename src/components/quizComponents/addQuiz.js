import React, { useState, useContext } from 'react';
import Axios from 'axios';
import '../styles/addQuiz.css';
import App_Bar from '../appBar';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Switch from '@material-ui/core/Switch';
import AddQuizForm from './addQuizForm';
import QuestionCard from './questionCard';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


function AddQuiz(props) {

    const [quiz, setQuiz] = useState([]);
    const [courseName, setCourseName] = useState("");
    const [quizTitle, setQuizTitle] = useState("");
    const [oneWay, setOneWay] = useState(false);
    const [successMsg, setSuccessMsg] = useState(false);
    const [failMsg, setFailMsg] = useState(false);
    const [openDialog, setDialogOpen] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false);


    const addNewQuestion = (newQuestion) => {
        setQuiz([...quiz, newQuestion]);
    }

    const editQuestion = (id, editedQuestion) => {
        const updatedQuestion = quiz.map(q => {
            if (q.id === id) {
                return {
                    ...q,
                    question: editedQuestion.question,
                    answersOptions: editedQuestion.answersOptions,
                    correctAnswer: editedQuestion.correctAnswer,
                }
            }
            return q;
        });
        setQuiz(updatedQuestion);
    }

    const deleteQuestion = (id) => {
        setQuiz(quiz.filter(q => q.id !== id));
    }

    const handleCourseNameChange = (evt) => {
        setCourseName(evt.target.value);
    }

    const handleQuizTitleChange = (evt) => {
        setQuizTitle(evt.target.value);
    }

    const isOneWay = (evt) => {
        setOneWay(evt.target.checked);
    }

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            setSnackBarOpen(false);
        }
        setSnackBarOpen(false);
    };

    const [createQuiz, { error }] = useMutation(CREATE_QUIZ, {
        variables: {
            course_name: courseName,
            quiz_title: quizTitle,
            number_of_questions: quiz.length,
            isOneWay: oneWay,
            questions: quiz
        },
        update(_, result) {
            if (result) {
                setSuccessMsg("Quiz Add Successfully");
                setSnackBarOpen(true);
                setQuiz([]);
            }
        },
        onError(err) {
            setFailMsg(err.graphQLErrors[0].message);
            setSnackBarOpen(true);
        },
    });

    const handleSubmit = (evt) => {
        evt.preventDefault();
        // if the user try to add a quiz with no questions
        if (quiz.length < 1) {
            setFailMsg("the quiz should have at least 1 question")
            setSnackBarOpen(true);
            // if the user try to add a quiz with more than 100 questions
        } else if (quiz.length > 100) {
            setFailMsg("the quiz should have at most 100 question")
            setSnackBarOpen(true);
        } else {
            createQuiz();
        }
        // if not show fail msg
        setDialogOpen(false);
    }

    return (
        <main className="addQuizRoot">
            <App_Bar backgroundColor={"#0A1E36"} />
            <Container style={{ padding: "15px 0" }} maxWidth="md">
                <AddQuizForm addNewQuestion={addNewQuestion} />
                {
                    quiz.map((quiz, i) => (
                        <QuestionCard
                            key={quiz.id}
                            question={quiz.question}
                            answers={quiz.answersOptions}
                            correctAnswer={quiz.correctAnswer}
                            questionNumber={i + 1}
                            id={quiz.id}
                            editQuestion={editQuestion}
                            deleteQuestion={deleteQuestion}
                        />
                    ))
                }
                <button style={{ margin: "10px 25px" }} className="addQuiz-Btn" onClick={handleDialogOpen}>
                    Save Quiz
               </button>
                <Dialog open={openDialog} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Save Quiz</DialogTitle>
                    <DialogContent className="dialogContent">
                        <form onSubmit={handleSubmit}>
                            <h3>Enter course name</h3>
                            <TextField
                                onChange={handleCourseNameChange}
                                required={true}
                                autoFocus
                                margin="dense"
                                id="course name"
                                label="course name"
                                fullWidth
                                name="courseName"
                            />
                            <h3>Optional : Enter quiz title</h3>
                            <TextField
                                onChange={handleQuizTitleChange}
                                margin="dense"
                                id="quiz title"
                                label="quiz title"
                                fullWidth
                                name="quizTitle"
                            />
                            <label htmlFor="isOneWay">
                                <strong>one way quiz ?</strong>
                            </label>
                            <Switch
                                checked={oneWay}
                                onChange={isOneWay}
                                color="primary"
                                name="oneWay"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                id="isOneWay"
                            />
                            <br />
                            <DialogActions>
                                <button className="addQuiz-paperBtn" type="submit"> Save Quiz </button>
                            </DialogActions>
                        </form>
                    </DialogContent>
                    <button className="cancelBtn" onClick={handleDialogClose}> Cancel </button>
                </Dialog>
                <Snackbar open={snackBarOpen} autoHideDuration={5000} onClose={handleSnackBarClose}>
                    {successMsg ? <Alert onClose={handleSnackBarClose} severity="success">
                        {successMsg}
                    </Alert>
                        :
                        failMsg && <Alert onClose={handleSnackBarClose} severity="error">
                            {failMsg}
                        </Alert>}
                </Snackbar>
            </Container>
        </main >
    );
};

const CREATE_QUIZ = gql`
  mutation createQuiz(
    $course_name: String!
    $quiz_title: String
    $questions: [QuestionInput!]
    $number_of_questions: Int!
    $isOneWay: Boolean!
  ) {
    createQuiz(
      quizInput: {
        course_name: $course_name
        quiz_title: $quiz_title
        questions: $questions
        number_of_questions: $number_of_questions
        isOneWay: $isOneWay
      }
    ) {
      id
      course_name
    }
  }
`;


export default AddQuiz;