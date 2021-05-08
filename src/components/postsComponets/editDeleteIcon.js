import React, { useState } from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteButton from './deleteButton';

function EditDeleteIcon({ postId, commentId, iconColor, showEditForm, handleCommentEditForm }) {

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

    const handleEditForm = () => {
        if (commentId) {
            handleCommentEditForm();
        } else {
            showEditForm();
        }
    }

    return (
        <div>
            <IconButton
                style={{ color: iconColor }}
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
                    <span onClick={handleEditForm}>Edit</span>
                </MenuItem>
                <MenuItem key="delete">
                    <DeleteButton postId={postId} commentId={commentId} />
                </MenuItem>
            </Menu>
        </div>
    );
}

export default EditDeleteIcon;