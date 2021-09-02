import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import CreateCommentForm from './createCommentForm';
import Fade from '@material-ui/core/Fade';
import LikeButton from './likeButton';
import Avatar from '@material-ui/core/Avatar';
import EditDeleteIcon from './editDeleteIcon';
import EditPostForm from './editPostForm';
import CommentItem from './commentItem';


function PostCard({ post: { id, body, image, createdAt, createdBy, comments, commentsCount, likes, likeCount }, user, fromDashboard, editPost, deletePost, addComment, editComment, deleteComment }) {

    const [showComments, setShowComments] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    const handleEditForm = () => {
        setShowEditForm(!showEditForm);
    }

    return (
        <div className="post-container">
            {
                showEditForm ? (
                    <EditPostForm
                        postId={id}
                        body={body}
                        image={image}
                        user={user}
                        fromDashboard={fromDashboard}
                        showEditForm={handleEditForm}
                        editPost={editPost}
                    />
                ) : (
                    <div className="post-card" style={{ width: showComments ? "" : "100%" }}>
                        {user && user.username === createdBy.username && (
                            <div style={{ marginLeft: -30, marginTop: -10 }}>
                                <EditDeleteIcon showEditForm={handleEditForm} deletePost={deletePost} postId={id} fromDashboard={fromDashboard} iconColor="white" />
                            </div>
                        )}
                        <div className="post-header">
                            <Link className="post-createdBy" to={`profile/${createdBy.username}`}>
                                {
                                    createdBy.image ? (
                                        <img style={{ width: 80, height: 80 }} src={createdBy.image} className="profile-pic" alt="profile-pic" />
                                    ) : (
                                        <Avatar
                                            style={{
                                                width: 70,
                                                height: 70,
                                                fontSize: 15,
                                            }} alt="Remy Sharp">
                                            {createdBy.first_name[0].toUpperCase()}  {createdBy.last_name[0].toUpperCase()}
                                        </Avatar>
                                    )
                                }
                                <span> {createdBy.first_name} {createdBy.last_name}</span>
                            </Link>
                            <span>{moment(createdAt).fromNow()}</span>
                        </div>
                        <div className="post-content">
                            <p className="post-body">{body}</p>
                            {
                                image && (
                                    <img alt="post" className="post-img" src={image} />
                                )
                            }
                        </div>
                        <hr />
                        <div className="react-post-buttons">
                            <LikeButton user={user} post={{ likes, likeCount, id }} />
                            <div onClick={() => setShowComments(!showComments)} className="comment-button">
                                <i class="fas fa-comments"></i>
                                <span style={{ marginLeft: 10 }}>{commentsCount} Comments</span>
                            </div>
                        </div>
                    </div>
                )
            }
            {showComments && (
                <Fade in={showComments} timeout={1000}>
                    <div className="comments-card">
                        <h3>Comments</h3>
                        {
                            user && (
                                <div className="comment-form-container">
                                    <CreateCommentForm postId={id} user={user} fromDashboard={fromDashboard} addComment={addComment} />
                                </div>
                            )
                        }
                        {
                            commentsCount === 0 ? <h3>No comments found</h3> :
                                <div className="comments-list">
                                    {
                                        comments.map(comment => (
                                            <>
                                                <CommentItem postId={id} comment={comment} user={user} fromDashboard={fromDashboard} deleteComment={deleteComment} editComment={editComment} />
                                            </>
                                        ))
                                    }
                                </div>
                        }
                    </div>
                </Fade>
            )}
        </div>
    );
}

export default PostCard;