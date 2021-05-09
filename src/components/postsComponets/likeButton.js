import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

function LikeButton({ post: { likeCount, likes, id }, user }) {

    const [like, setLike] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (user && likes.find(like => like.username === user.username)) {
            setLike(true);
        } else {
            setLike(false);
        }
    }, [user, likes]);

    const [likePost] = useMutation(LIKE_POST, {
        variables: { postId: id },
    });

    const handleClose = () => {
        setOpen(false);
    };

    const like_post = () => {
        if (user) {
            likePost();
        } else {
            setOpen(true);
        }
    }

    const likeButton = user ? (
        like ? (
            <FavoriteIcon className="like-icon" />
        ) : (
            <FavoriteBorderOutlinedIcon className="like-icon" />
        )
    ) : (
        <FavoriteBorderOutlinedIcon className="like-icon" />
    );

    return (
        <>
            <div onClick={like_post} className="like-button">
                {likeButton}
                <span style={{ marginLeft: 10 }}>{likeCount}</span>
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

const LIKE_POST = gql`
    mutation likePost($postId: ID!){
        likePost(postId: $postId){
            id
            likes{
                id username
            }
            likeCount
        }
    }
`;

export default LikeButton;