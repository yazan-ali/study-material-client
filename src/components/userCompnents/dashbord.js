import React, { useState, useContext } from 'react';
import '../styles/profile.css';
import Container from '@material-ui/core/Container';
import AppBar1 from '../appBar';
import Avatar from '@material-ui/core/Avatar';
import QuizItem from '../quizComponents/quizItem';
import PostCard from '../postsComponets/postCard';
import PostForm from '../postsComponets/postForm';
import { AuthContext } from '../userContext';


function Dashbord(props) {

    const [tab, setTab] = useState(0);

    const { user } = useContext(AuthContext);


    const handleTabsChange = (value) => {
        setTab(value);
    };


    const [userData, setUserData] = useState(props.userData);

    const addPost = (newPost) => {
        const newData = { ...userData, posts: [...userData.posts, newPost] }
        setUserData(newData)
    }

    const editPost = (updatedPost) => {
        const updatedPosts = userData.posts.map(post => {
            if (post.id === updatedPost.postId) {
                return { ...post, body: updatedPost.body, image: updatedPost.image }
            } else {
                return post;
            }
        })
        setUserData({ ...userData, posts: updatedPosts })
    }

    const deletePost = (id) => {
        const filterUserPost = userData.posts.filter(post => post.id !== id);
        setUserData({ ...userData, posts: filterUserPost });
    }

    const addComment = (postId, newComment) => {

        const newPostsData = userData.posts.map(post => {
            if (post.id === postId) {
                const newPostComment = [newComment, ...post.comments];
                return { ...post, commentsCount: post.commentsCount + 1, comments: newPostComment };
            } else {
                return post;
            }
        });
        setUserData({ ...userData, posts: newPostsData });
    }

    const editComment = (postId, commentId, updatedComment) => {

        const newPostsData = userData.posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post, comments: post.comments.map(comment => {
                        if (comment.id === commentId) {
                            return updatedComment
                        } else {
                            return comment;
                        }
                    })
                };
            } else {
                return post;
            }
        });

        setUserData({ ...userData, posts: newPostsData });
    }

    const deleteComment = (postId, commentId) => {
        const filterUserPostComments = userData.posts.map(post => {
            if (post.id === postId) {
                return { ...post, commentsCount: post.commentsCount - 1, comments: post.comments.filter(comment => comment.id !== commentId) };
            } else {
                return post;
            }
        });
        setUserData({ ...userData, posts: filterUserPostComments });
    }

    const handleQuizDelete = (id) => {
        const filterUserQuizizz = userData.quizizz.filter(quiz => quiz.id !== id);
        setUserData({ ...userData, quizizz: filterUserQuizizz });
    }

    return (
        <div>
            <AppBar1 backgroundColor={"#4A156B"} />
            <Container maxWidth="lg">
                <div className="profile-container">
                    <div className="profile-card">
                        <Avatar className="profile-pic"
                            style={{
                                width: 90,
                                height: 90,
                                fontSize: 30,
                                backgroundColor: "#fff",
                                color: "#5F2384",
                                fontWeight: 600
                            }} alt="Remy Sharp">
                            {userData.first_name[0].toUpperCase()}  {userData.first_name[0].toUpperCase()}
                        </Avatar>
                        <div className="user-info">
                            <h3>{userData.first_name} {userData.last_name}</h3>
                            <h3> {userData.university}</h3>
                            <h3>{userData.major}</h3>
                        </div>
                        <div className="tabs-bar">
                            <button style={{ borderBottom: tab === 0 && "4px solid #5F2384" }} onClick={() => handleTabsChange(0)}>Quizizz</button>
                            <button style={{ borderBottom: tab === 1 && "4px solid #5F2384" }} onClick={() => handleTabsChange(1)}>Posts</button>
                        </div>
                    </div>
                    {tab === 0 && (
                        <div style={{ marginTop: 50, }}>
                            <a className="AddQuizBtn" href="/quiz/new">Add New Quiz</a>
                            <div style={{ marginTop: 20 }} className="quiz-list">
                                {
                                    userData.quizizz.map(q => (
                                        <QuizItem quiz={q} key={q._id} handleQuizDelete={handleQuizDelete} fromDashboard={true} />
                                    ))
                                }
                            </div>
                        </div>
                    )}
                    {tab === 1 && (
                        <div style={{ marginTop: 50 }} className="posts-container">
                            {user && <PostForm user={user} fromDashboard={true} addPost={addPost} />}
                            {
                                userData.posts.map(post => (
                                    <PostCard post={post} user={user} fromDashboard={true} editPost={editPost} deletePost={deletePost} deleteComment={deleteComment} addComment={addComment} editComment={editComment} />
                                ))
                            }
                        </div>
                    )}
                </div>
            </Container>
        </div >
    );
}

export default Dashbord;