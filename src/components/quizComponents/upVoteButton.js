import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import ForwardOutlinedIcon from '@material-ui/icons/ForwardOutlined';
import ForwardIcon from '@material-ui/icons/Forward';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

function UpVoteButton({ user, quizId, up_votes, up_votes_count, }, props) {

    const [upVoted, setUpVoted] = useState(false);

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (user && up_votes.includes(user.id)) {
            setUpVoted(true);
        } else {
            setUpVoted(false);
        }
    }, [user, up_votes]);

    const [upVoteQuiz] = useMutation(UP_VOTE_QUIZ, {
        variables: {
            quizId: quizId,
            userId: user ? user.id : null
        },
    });

    const upVote = () => {
        if (user) {
            upVoteQuiz();
        } else {
            setOpen(true);
        }
    }

    const upVoteButton = user ? (
        upVoted ? (
            <ForwardIcon style={{ transform: "rotate(270deg)", marginTop: 8, marginRight: 5 }} />
        ) : (
            <ForwardOutlinedIcon style={{ transform: "rotate(270deg)", marginTop: 8, marginRight: 5 }} />
        )
    ) : (
        <ForwardOutlinedIcon style={{ transform: "rotate(270deg)", marginTop: 8, marginRight: 5 }} />
    )

    return (
        <>
            <div style={{ display: "flex", alignItems: "center" }}>
                <span onClick={upVote}>
                    {upVoteButton}
                </span>
                {
                    up_votes_count !== null ? (
                        <span>{up_votes_count}</span>
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
                        <a href="/login">Login</a>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
}

const UP_VOTE_QUIZ = gql`
    mutation upVoteQuiz(
        $quizId: ID!
        $userId: ID!
        ){
        upVoteQuiz(
            quizId: $quizId
            userId: $userId
            ){
            id
            up_votes
            up_votes_counts
            down_votes
            down_votes_counts
            up_votes
            up_votes_counts
        }
    }
`;

export default UpVoteButton;