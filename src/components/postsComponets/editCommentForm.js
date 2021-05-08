import React, { useState, useRef } from 'react';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function CreateCommentForm({ postId, commentId, commentBody, user, handleCommentEditForm }) {

    const [failMsg, setFailMsg] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false);

    const handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            setSnackBarOpen(false);
        }
        setSnackBarOpen(false);
    };

    const [body, setBody] = useState(commentBody);

    const handleChange = (evt) => {
        setBody(evt.target.value);
    }

    const [createComment] = useMutation(UPDATE_COMMENT_MUTAION, {
        update() {
            handleCommentEditForm();
        },
        variables: {
            postId,
            commentId,
            body,
        },
        onError(err) {
            setFailMsg(err.graphQLErrors[0].message);
            setSnackBarOpen(true);
        }
    });

    const handleSubmit = (evt) => {
        evt.preventDefault();
        createComment();
    }

    return (
        <div>
            <form className="add-comment-form" onSubmit={handleSubmit}>
                <input type="text" name="body" value={body} onChange={handleChange} placeholder="Edit Comment" />
                <button disabled={!user} type="submit">Edit Comment</button>
                <button style={{ marginLeft: 10 }} onClick={() => handleCommentEditForm()}>Cancel</button>
            </form>
            <Snackbar open={snackBarOpen} autoHideDuration={5000} onClose={handleSnackBarClose}>
                <Alert onClose={handleSnackBarClose} severity="error">
                    {failMsg}
                </Alert>
            </Snackbar>
        </div>
    );
}

const UPDATE_COMMENT_MUTAION = gql`
  mutation updateComment($postId: ID!, $commentId: ID!, $body: String!){
      updateComment(postId: $postId, commentId: $commentId, body: $body){
          id
          comments{
              id body first_name last_name username createdAt
          }
          commentsCount
      }
  }
`;

export default CreateCommentForm;