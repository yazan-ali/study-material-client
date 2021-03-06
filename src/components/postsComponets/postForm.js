import React, { useState, useRef } from 'react';
import ImageUplode from '../image_uplode';
import { Link } from 'react-router-dom';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { FETCH_POSTS_QUERY } from '../../util/graphql';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function PostForm({ user, fromDashboard, addPost }) {

    const commentInputRef = useRef(null);

    const [failMsg, setFailMsg] = useState(false);
    const [loading, setLoading] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false);


    const handleSnackBarClose = (_, reason) => {
        if (reason === 'clickaway') {
            setSnackBarOpen(false);
        }
        setSnackBarOpen(false);
    };

    const [values, setValues] = useState({
        body: "",
        image: ""
    });

    const handleChange = (evt) => {
        setValues({ ...values, [evt.target.name]: evt.target.value });
    }

    const [createPost,] = useMutation(CREATE_POST, {
        variables: {
            body: values.body,
            image: values.image
        },
        update(proxy, result) {
            if (fromDashboard) {
                addPost({
                    ...result.data.createPost,
                    createdBy: {
                        username: user.username,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        image: user.image
                    }
                });
            } else {
                const data = proxy.readQuery({
                    query: FETCH_POSTS_QUERY
                });
                proxy.writeQuery({
                    query: FETCH_POSTS_QUERY,
                    data: {
                        getPosts: [result.data.createPost, ...data.getPosts],
                    },
                });
            }
            setValues({
                body: "",
                image: ""
            });
            commentInputRef.current.blur();
        },
        onError(err) {
            setFailMsg(err.graphQLErrors[0].message);
            setSnackBarOpen(true);
        }
    });

    const handelImageLoading = (isLoading) => {
        setLoading(isLoading)
    }

    const handelUploadImage = (img_url, isLoading) => {
        setValues({ ...values, image: img_url });
        handelImageLoading(isLoading)
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        createPost();
    }

    return (
        <div>
            <form className="add-post-form" onSubmit={handleSubmit}>
                <h2>Create a Post </h2>
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
                <div style={{ display: "flex", marginTop: 20 }}>
                    <input type="text"
                        name="body"
                        value={values.body}
                        onChange={handleChange}
                        placeholder="Add Post"
                        ref={commentInputRef}
                    />
                    <ImageUplode handelUploadImage={handelUploadImage} />
                </div>
                <img style={{ maxWidth: "100%", marginTop: 20 }} src={values.image} />
                {
                    loading ? <div style={{ display: "flex", alignItems: "center" }}>
                        <button style={{ marginRight: 20 }} disabled type="submit">Add Post</button>
                        <CircularProgress style={{ color: "gray", marginTop: 18 }} />
                    </div>
                        :
                        <button type="submit">Add Post</button>
                }
            </form>
            <Snackbar open={snackBarOpen} autoHideDuration={5000} onClose={handleSnackBarClose}>
                <Alert onClose={handleSnackBarClose} severity="error">
                    {failMsg}
                </Alert>
            </Snackbar>
        </div>
    );
}

const CREATE_POST = gql`
            mutation createPost(
            $body: String!
            $image: String
            ){
                createPost(
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
                username
                    first_name
            last_name
            image
                }
            createdAt
            }
            commentsCount
        }
    }
            `;

export default PostForm;