import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../styles/quizList.css';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import { AuthContext } from '../userContext';
import UpVoteButton from './upVoteButton';
import DownVoteButton from './downVoteButton';
import DeleteButton from './deleteButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

function QuizItem(props) {

    const { user } = useContext(AuthContext);

    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (evt, reason) => {
        if (reason === 'clickaway') {
            setAnchorEl(null);
        }
        setAnchorEl(null);
    };

    return (
        <div className="quiz-div quizListBackground">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Link className="capitalize" to={`/quiz/${props.quiz.course_name}/${props.quiz.id}`}>{props.quiz.course_name} {props.quiz.quiz_title && `: ${props.quiz.quiz_title}`} </Link>
                {
                    user && user.username === props.quiz.createdBy.username && (
                        <div style={{ width: 20, marginTop: -12, marginRight: 20 }}>
                            <IconButton
                                style={{ color: "white" }}
                                aria-label="more"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                onClick={handleClick}
                            >
                                <MoreVertIcon style={{ width: 40 }} className="icons" />
                            </IconButton>
                            <Menu
                                id="long-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={openMenu}
                                onClose={handleMenuClose}
                                PaperProps={{
                                    style: {
                                        maxHeight: 48 * 4.5,
                                        width: '20ch',
                                    },
                                }}
                            >
                                <MenuItem key="edit">
                                    <a style={{ textDecoration: "none", color: "black" }} href={`/quiz/${props.quiz.id}/${props.quiz.createdBy.username}/edit`}>Edit</a>
                                </MenuItem>
                                <MenuItem key="delete">
                                    <DeleteButton deleteFromDashbord={props.fromDashboard} handleQuizDelete={props.handleQuizDelete} quizId={props.quiz.id} />
                                </MenuItem>
                            </Menu>
                        </div>
                    )
                }
            </div>
            <span>{props.quiz.number_of_questions} Questions</span>
            <div style={{ display: "flex", alignItems: "center" }}>
                <PersonRoundedIcon style={{ color: "white" }} />
                <span>{props.quiz.participants}</span>
            </div>
            <Link to={`/profile/${props.quiz.createdBy.username}`} > {`Created by : ${props.quiz.createdBy.username}`}</Link>
            <div style={{ marginTop: "auto" }}>
                <UpVoteButton
                    quizId={props.quiz.id}
                    up_votes={props.quiz.up_votes}
                    up_votes_count={props.quiz.up_votes_counts}
                    user={user}
                />
                <DownVoteButton
                    quizId={props.quiz.id}
                    down_votes={props.quiz.down_votes}
                    down_votes_count={props.quiz.down_votes_counts}
                    user={user}
                />
            </div>
        </div >
    );
}


export default QuizItem;