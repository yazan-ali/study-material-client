import React, { useState, useEffect } from 'react';
import '../styles/addQuiz.css';
import AppBar from '../appBar';
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
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function EditQuizForm(props) {

    const [quizData] = useState(props.quiz);
    const [quiz, setQuiz] = useState(props.quiz.questions);
    const [open, setOpen] = useState(false);
    const [courseName, setCourseName] = useState(quizData.course_name);
    const [quizTitle, setQuizTitle] = useState(quizData.quiz_title);
    const [oneWay, setOneWay] = useState(false);
    const [showNewQuestionForm, setShowNewQuestionForm] = useState(false)
    const [successMsg, setSuccessMsg] = useState(false);
    const [failMsg, setFailMsg] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false);

    useEffect(() => {
        // to remove __typename key from the data object
        const quizData = quiz.map(q => ({
            question: q.question,
            answersOptions: q.answersOptions.map(a => ({ answerText: a.answerText })),
            correctAnswer: q.correctAnswer,
            id: q.id,
        })
        )
        setQuiz(quizData);
    }, []);


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

    const handleChange = (evt) => {
        setCourseName(evt.target.value);
    }

    const handleChange2 = (evt) => {
        setQuizTitle(evt.target.value);
    }

    const isOneWay = (evt) => {
        setOneWay(evt.target.checked);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const showAddNewQuestionForm = () => {
        setShowNewQuestionForm(!showNewQuestionForm);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            setSnackBarOpen(false);
        }
        setSnackBarOpen(false);
    };

    const [updateQuiz] = useMutation(UPDATE_QUIZ, {
        variables: {
            quizId: quizData.id,
            course_name: courseName,
            quiz_title: quizTitle,
            number_of_questions: quiz.length,
            isOneWay: oneWay,
            questions: quiz,
        },
        update(_, result) {
            if (result) {
                setSuccessMsg("Quiz Updated Successfully");
                setSnackBarOpen(true);
                window.location.reload();
            }
        },
        onError(err) {
            setFailMsg(err.graphQLErrors[0].message);
            console.log(err)
            setSnackBarOpen(true);
        },
    });

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (quiz.length < 1) {
            setFailMsg("the quiz should have at least 1 question")
            setSnackBarOpen(true);
        } else if (quiz.length > 100) {
            setFailMsg("the quiz should have at most 100 question")
            setSnackBarOpen(true);
        } else {
            updateQuiz();
            console.log(quiz)
        }
        setOpen(false);
    }





    return (
        <main className="addQuizRoot">
            <AppBar backgroundColor={"#0A1E36"} />
            <Container style={{ padding: "15px 0" }} maxWidth="md">
                <button style={{ margin: "10px 25px" }} className="addQuiz-paperBtn" onClick={showAddNewQuestionForm}>{`${showNewQuestionForm ? "Cancel" : "Add new question"}`}</button>
                {showNewQuestionForm && <AddQuizForm addNewQuestion={addNewQuestion} />}
                {
                    quiz && quiz.map((quiz, i) => (
                        <QuestionCard
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
                <button style={{ margin: "10px 25px" }} className="addQuiz-paperBtn" onClick={handleClickOpen}>
                    Update Quiz
               </button>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Update Quiz</DialogTitle>
                    <DialogContent className="dialogContent">
                        <form onSubmit={handleSubmit}>
                            <h3>Enter course name</h3>
                            <TextField
                                onChange={handleChange}
                                required={true}
                                autoFocus
                                margin="dense"
                                id="course name"
                                label="course name"
                                fullWidth
                                name="courseName"
                                defaultValue={quizData.course_name}
                            />
                            <h3>Optional : Enter quiz title</h3>
                            <TextField
                                onChange={handleChange2}
                                margin="dense"
                                id="quiz title"
                                label="quiz title"
                                fullWidth
                                name="quizTitle"
                                defaultValue={quizData.quiz_title ? quizData.quiz_title : ""}
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
                                <button className="addQuiz-paperBtn" type="submit"> Update Quiz </button>
                            </DialogActions>
                        </form>
                    </DialogContent>
                    <button className="cancelBtn" onClick={handleClose}> Cancel </button>
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

const UPDATE_QUIZ = gql`
  mutation updateQuiz(
    $quizId: ID!
    $course_name: String!
    $quiz_title: String
    $questions: [QuestionInput!]
    $number_of_questions: Int!
    $isOneWay: Boolean!
  ) {
    updateQuiz(
      quizId: $quizId
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


export default EditQuizForm;