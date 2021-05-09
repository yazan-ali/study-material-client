import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import ForwardOutlinedIcon from '@material-ui/icons/ForwardOutlined';
import ForwardIcon from '@material-ui/icons/Forward';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

function DownVoteButton({ user, quizId, down_votes, down_votes_count }) {

    const [downVoted, setDownVoted] = useState(false);

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (user && down_votes.includes(user.id)) {
            setDownVoted(true);
        } else {
            setDownVoted(false);
        }
    }, [user, down_votes]);

    const [downVoteQuiz] = useMutation(DOWN_VOTE_QUIZ, {
        variables: {
            quizId: quizId,
            userId: user ? user.id : null
        },
    });

    const downVote = () => {
        if (user) {
            downVoteQuiz();
        } else {
            setOpen(true);
        }
    }

    const downVoteButton = user ? (
        downVoted ? (
            <ForwardIcon style={{ transform: "rotate(90deg)", marginTop: 8, marginRight: 5 }} />
        ) : (
            <ForwardOutlinedIcon style={{ transform: "rotate(90deg)", marginTop: 8, marginRight: 5 }} />
        )
    ) : (
        <ForwardOutlinedIcon style={{ transform: "rotate(90deg)", marginTop: 8, marginRight: 5 }} />
    )

    return (
        <>
            <div style={{ display: "flex", alignItems: "center" }}>
                <span onClick={downVote}>
                    {downVoteButton}
                </span>
                {
                    down_votes_count !== null ? (
                        <span>{down_votes_count}</span>
                    ) : ""
                }
            </div>
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"You should be logged in to be able to do this action"}</DialogTitle>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Link className="loginDialogBtn" to="/login">Login</Link>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
}

const DOWN_VOTE_QUIZ = gql`
    mutation downVoteQuiz(
        $quizId: ID!
        $userId: ID!
        ){
        downVoteQuiz(
            quizId: $quizId
            userId: $userId
            ){
            id
            down_votes
            down_votes_counts
            up_votes
            up_votes_counts
        }
    }
`;

export default DownVoteButton;