import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { FETCH_POSTS_QUERY } from '../../util/graphql';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Avatar from '@material-ui/core/Avatar';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


function EditPostForm({ postId, body, image, user, showEditForm, fromDashboard, editPost }) {

    const [failMsg, setFailMsg] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false);

    const handleSnackBarClose = (_, reason) => {
        if (reason === 'clickaway') {
            setSnackBarOpen(false);
        }
        setSnackBarOpen(false);
    };

    const [values, setValues] = useState({
        body: body,
        image: image
    });

    const [updatePost] = useMutation(UPDATE_POST, {
        variables: {
            postId,
            body: values.body,
            image: values.image
        },
        update(proxy, result) {
            if (fromDashboard) {
                const updatedPost = {
                    postId: postId,
                    body: values.body,
                    image: values.image,
                }
                editPost(updatedPost);
                showEditForm();
            }
            else {
                let data = proxy.readQuery({
                    query: FETCH_POSTS_QUERY
                });
                const updatedPost = data.getPosts.map(post => {
                    if (post.id === postId) {
                        return { ...post, body: values.body, image: values.image }
                    } else {
                        return post
                    }
                });
                proxy.writeQuery({
                    query: FETCH_POSTS_QUERY,
                    data: {
                        getPosts: updatedPost,
                    },
                });
                showEditForm();
            }
        },
        onError(err) {
            setFailMsg(err.graphQLErrors[0].message);
            setSnackBarOpen(true);
        }
    });

    const handleChange = (evt) => {
        setValues({ ...values, [evt.target.name]: evt.target.value });
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        updatePost();
    }

    return (
        <div style={{ width: "100%" }}>
            <form className="add-post-form" onSubmit={handleSubmit}>
                {
                    user && <Link className="post-createdBy" to={`profile/${user.username}`}>
                        {
                            user.image ? (
                                <img style={{ width: 80, height: 80 }} src={user.image} className="profile-pic" alt="profile-pic" />
                            ) : (
                                <Avatar
                                    style={{
                                        width: 40,
                                        fontSize: 15,
                                    }} alt="Remy Sharp">
                                    {user.first_name[0].toUpperCase()}  {user.first_name[0].toUpperCase()}
                                </Avatar>
                            )
                        }
                        <span style={{ color: "gray" }}> {user.first_name} {user.last_name}</span>
                    </Link>
                }
                <input style={{ marginTop: 20 }} type="text" name="body" value={values.body} onChange={handleChange} placeholder="Edit Post" />
                <button disabled={!user} type="submit">Edit Post</button>
                <button style={{ marginLeft: 10 }} onClick={() => showEditForm()}>Cancel</button>
            </form>
            <Snackbar open={snackBarOpen} autoHideDuration={5000} onClose={handleSnackBarClose}>
                <Alert onClose={handleSnackBarClose} severity="error">
                    {failMsg}
                </Alert>
            </Snackbar>
        </div>
    );
}

const UPDATE_POST = gql`
    mutation updatePost(
        $postId: ID!
        $body: String! 
        $image: String
       ){
        updatePost(
            postId: $postId
            body: $body 
            image: $image
            ){
            id body image createdAt 
            likes{
                username
            }
            likeCount
            comments{
                id 
                body 
                createdBy{
                    first_name 
                    last_name 
                    username
                    image
                }
                createdAt
            }
            commentsCount
        }
    }
`;

export default EditPostForm;