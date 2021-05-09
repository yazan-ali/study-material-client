import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { FETCH_QUIZ_QUERY } from '../../util/graphql';

function DeleteButton({ quizId, deleteFromDashbord, handleQuizDelete }) {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const [deleteQuiz] = useMutation(DELETE_QUIZ, {
        update(proxy) {
            setOpen(true);
            if (deleteFromDashbord) {
                handleQuizDelete(quizId);
            } else {
                const data = proxy.readQuery({
                    query: FETCH_QUIZ_QUERY
                });
                proxy.writeQuery({
                    query: FETCH_QUIZ_QUERY,
                    data: {
                        getQuizizz: data.getQuizizz.filter(quiz => quiz.id !== quizId),
                    },
                });
            }
            setOpen(false);
        },
        variables: { quizId }
    })

    return (
        <div>
            <span style={{ cursor: "pointer" }} variant="outlined" color="primary" onClick={handleClickOpen}>
                Delete
            </span>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this quiz?"}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => deleteQuiz()} color="primary" >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const DELETE_QUIZ = gql`
  mutation deleteQuiz($quizId: ID!){
      deleteQuiz(quizId : $quizId)
  }
`

export default DeleteButton;