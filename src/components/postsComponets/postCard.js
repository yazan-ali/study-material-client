import React, { useState } from 'react';
import moment from 'moment';
import CreateCommentForm from './createCommentForm';
import Fade from '@material-ui/core/Fade';
import LikeButton from './likeButton';
import Avatar from '@material-ui/core/Avatar';
import EditDeleteIcon from './editDeleteIcon';
import EditPostForm from './editPostForm';
import CommentItem from './commentItem';


function PostCard({ post: { id, body, image, createdAt, createdBy, comments, commentsCount, likes, likeCount }, user }) {

    const [showComments, setShowComments] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    const handleEditForm = () => {
        setShowEditForm(!showEditForm);
    }

    return (
        <div className="post-container">
            {
                showEditForm ? (
                    <EditPostForm postId={id} body={body} image={image} user={user} showEditForm={handleEditForm} />
                ) : (
                    <div className="post-card" style={{ width: showComments ? "" : "100%" }}>
                        {user && user.username === createdBy.username && (
                            <div style={{ marginLeft: -30, marginTop: -10 }}>
                                <EditDeleteIcon showEditForm={handleEditForm} postId={id} iconColor="white" />
                            </div>
                        )}
                        <div className="post-header">
                            <a className="post-createdBy" href={`profile/${createdBy.username}`}>
                                <Avatar style={{ width: 40, fontSize: 15 }} alt="Remy Sharp">
                                    {createdBy.first_name[0].toUpperCase()}  {createdBy.first_name[0].toUpperCase()}
                                </Avatar>
                                <span> {createdBy.first_name} {createdBy.last_name}</span>
                            </a>
                            <span>{moment(createdAt).fromNow()}</span>
                        </div>
                        <div className="post-content">
                            <h1 className="post-body">{body}</h1>
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
                                <span>{commentsCount} Comments</span>
                            </div>
                        </div>
                    </div>
                )
            }
            { showComments && (
                <Fade in={showComments} timeout={1000}>
                    <div className="comments-card">
                        <h3>Comments</h3>
                        {
                            user && (
                                <div className="comment-form-container">
                                    <CreateCommentForm postId={id} user={user} />
                                </div>
                            )
                        }
                        <div className="comments-list">
                            {
                                comments.map(comment => (
                                    <>
                                        <CommentItem postId={id} comment={comment} user={user} />
                                    </>
                                ))
                            }
                        </div>
                    </div>
                </Fade>
            )}
        </div>
    );
}

export default PostCard;