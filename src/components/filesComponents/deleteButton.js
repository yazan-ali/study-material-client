import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { FETCH_FILES_QUERY } from '../../util/graphql';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';

function DeleteButton({ fileId, deleteFromDashbord, handleQuizDelete }) {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const [deleteFile] = useMutation(DELETE_FILE, {
        update(proxy) {
            setOpen(true);
            if (deleteFromDashbord) {
                handleQuizDelete(fileId);
            } else {
                const data = proxy.readQuery({
                    query: FETCH_FILES_QUERY
                });
                proxy.writeQuery({
                    query: FETCH_FILES_QUERY,
                    data: {
                        getFiles: data.getFiles.filter(file => file.id !== fileId),
                    },
                });
            }
            setOpen(false);
        },
        variables: { fileId }
    })

    return (
        <div>
            <span style={{ cursor: "pointer", color: "gray" }} variant="outlined" color="primary" onClick={handleClickOpen}>
                <DeleteForeverRoundedIcon style={{ color: "#fff" }} />
            </span>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this file?"}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => deleteFile()} color="primary" >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const DELETE_FILE = gql`
  mutation deleteFile($fileId: ID!){
      deleteFile(fileId : $fileId)
  }
`

export default DeleteButton;