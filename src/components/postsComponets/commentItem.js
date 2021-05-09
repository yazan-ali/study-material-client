import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EditCommentForm from './editCommentForm';
import Avatar from '@material-ui/core/Avatar';
import EditDeleteIcon from './editDeleteIcon';

function CommentItem({ comment: { username, first_name, last_name, id, body }, postId, user }) {

    const [showCommentEditForm, setShowCommentEditForm] = useState(false);

    const handleCommentEditForm = () => {
        setShowCommentEditForm(!showCommentEditForm);
    }

    return (
        <div>
            {
                showCommentEditForm ? (
                    <div className="comment-form-container">
                        <EditCommentForm
                            postId={postId}
                            commentId={id}
                            commentBody={body}
                            user={user}
                            handleCommentEditForm={handleCommentEditForm}
                        />
                    </div>
                ) : (
                    <div className="comment">
                        <div style={{ marginLeft: -10 }} className="post-header">
                            <Link className="post-createdBy" to={`profile/${username}`}>
                                <Avatar style={{ width: 40, fontSize: 15 }} alt="Remy Sharp">
                                    {first_name[0].toUpperCase()}  {first_name[0].toUpperCase()}
                                </Avatar>
                                <span> {first_name} {last_name}</span>
                            </Link>
                            {user && user.username === username && (
                                <div style={{ marginLeft: -50, marginTop: -10, width: 30 }}>
                                    <EditDeleteIcon
                                        postId={postId}
                                        commentId={id} i
                                        conColor="gray"
                                        handleCommentEditForm={handleCommentEditForm}
                                    />
                                </div>
                            )}
                        </div>
                        <p>{body}</p>
                    </div>
                )
            }
        </div>
    );
}

export default CommentItem;