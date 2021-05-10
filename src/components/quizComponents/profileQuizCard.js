import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteButton from './deleteButton';


function ProfileQuizCard(props) {

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
        <div className="user-material">
            <Link to={`/quiz/${props.quiz.course_name}/${props.quiz.id}`}>{props.quiz.course_name} : {props.quiz.quiz_title}</Link>
            <IconButton
                style={{ color: "white" }}
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon style={{ width: 20 }} className="icons" />
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
                    <a style={{ textDecoration: "none", color: "black" }} href={`/quiz/${props.quiz.id}/${props.user.username}/edit`}>Edit</a>
                </MenuItem>
                <MenuItem key="delete">
                    <DeleteButton deleteFromDashbord={true} quizId={props.quiz.id} handleQuizDelete={props.handleQuizDelete} />
                </MenuItem>
            </Menu>
        </div>
    )
}

export default ProfileQuizCard;