import React, { useState, useRef } from 'react';
import '../styles/files.css';
import { PickerOverlay } from 'filestack-react';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { FETCH_FILES_QUERY } from '../../util/graphql';
import { fade, withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        border: "2px solid  gray",
        position: 'relative',
        backgroundColor: theme.palette.common.white,
        fontSize: 16,
        width: '400px',
        [theme.breakpoints.down('md')]: {
            width: "300px",
        },
        padding: '10px 12px',
        marginBottom: 15,
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: "#5F2384",
        },
    },
}))(InputBase);


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function FileUpload({ fromDashboard, addFile }) {

    const [fileUrl, setFileUrl] = useState("");
    const [uploadId, setUploadId] = useState("");
    const [showFilePicker, setShowFilePicker] = useState(false);
    const [courseName, setCourseName] = useState("");
    const [fileName, setFileName] = useState("");
    const [successMsg, setSuccessMsg] = useState(false);
    const [failMsg, setFailMsg] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [showFileUpload, setShowFileUpload] = useState(false);

    const inputRef = useRef(null);

    const handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            setSnackBarOpen(false);
        }
        setSnackBarOpen(false);
    };

    const handelShowFilePicker = () => {
        setShowFilePicker(true)
    }

    const handelShowFileUpload = () => {
        setShowFileUpload(prefState => !prefState)
    }

    const handleCourseNameChange = (evt) => {
        setCourseName(evt.target.value)
    }

    const handleFileNameChange = (evt) => {
        setFileName(evt.target.value)
    }

    const [uploadFile,] = useMutation(UPLOAD_FILE, {
        variables: {
            course_name: courseName,
            file_name: fileName,
            file_url: fileUrl,
            uploadId: uploadId,
        },
        update(proxy, result) {
            if (result) {
                setSuccessMsg("File Uploaded Successfully");
                setSnackBarOpen(true);
                setFileUrl("");
                setFileName("");
            }
            if (fromDashboard) {
                addFile(result.data.uploadFile);
            } else {
                const data = proxy.readQuery({
                    query: FETCH_FILES_QUERY
                });
                proxy.writeQuery({
                    query: FETCH_FILES_QUERY,
                    data: {
                        getFiles: [result.data.uploadFile, ...data.getFiles],
                    },
                });
            }
            inputRef.current.blur();
        },
        onError(err) {
            setFailMsg(err.graphQLErrors[0].message);
            console.log(err.graphQLErrors[0].message)
            setSnackBarOpen(true);
        }
    });

    const clearFilePicker = () => {
        setFileUrl("")
        setFileName("")
    }

    const handelFileUpolad = (res) => {
        const filename = res.filesUploaded[0].filename
        setFileUrl(res.filesUploaded[0].url)
        setUploadId(res.filesUploaded[0].uploadId)
        setFileName(filename)
    }

    const handelFileSubmit = (evt) => {
        evt.preventDefault();
        uploadFile();
    }

    return (
        <div style={{ width: "100%", display: "flex", justifyContent: "flex-start" }}>
            <button
                className="AddQuizBtn"
                onClick={handelShowFileUpload}
            >
                {`${showFileUpload ? "Close" : "Upload File"}`}
            </button>
            {showFileUpload && (
                <div className="file-upload-root">
                    <h2>File Upload</h2>
                    <form onSubmit={handelFileSubmit}>
                        <FormControl>
                            <InputLabel ref={inputRef} style={{ color: " gray", fontWeight: 600 }} shrink htmlFor="bootstrap-input">
                                Course Name *
                            </InputLabel>
                            <BootstrapInput
                                onChange={handleCourseNameChange}
                                value={courseName}
                                name="course_name"
                                id="bootstrap-input"
                                required
                            />
                        </FormControl>
                        {fileUrl.length > 0 && (
                            <FormControl>
                                <InputLabel style={{ color: " gray", fontWeight: 600 }} shrink htmlFor="bootstrap-input">
                                    File Name *
                                </InputLabel>
                                <BootstrapInput
                                    onChange={handleFileNameChange}
                                    value={fileName}
                                    name="file_name"
                                    id="bootstrap-input"
                                    required
                                />
                            </FormControl>
                        )}
                        {fileUrl.length > 0 &&
                            <p>
                                <em>Selected file: {fileName}</em>
                                <span onClick={clearFilePicker}>
                                    < ClearRoundedIcon style={{ marginBottom: -5 }} />
                                </span>
                            </p>
                        }
                        {
                            showFilePicker && (
                                <PickerOverlay
                                    apikey="AYjtgfnMtSSCeojaAOQcnz"
                                    onSuccess={(res) => setShowFilePicker(false)}
                                    onUploadDone={(res) => handelFileUpolad(res)}
                                    pickerOptions={{ fromSources: ["local_file_system", "googledrive"] }}
                                />
                            )
                        }
                        <div className="btn-container">
                            {
                                fileUrl.length > 0 ? (
                                    <button type="submit">Submit</button>
                                ) : (
                                    <button onClick={handelShowFilePicker} type="button">Upload file</button>
                                )
                            }
                        </div>
                        <Snackbar open={snackBarOpen} autoHideDuration={5000} onClose={handleSnackBarClose}>
                            {successMsg ? <Alert onClose={handleSnackBarClose} severity="success">
                                {successMsg}
                            </Alert>
                                :
                                failMsg && <Alert onClose={handleSnackBarClose} severity="error">
                                    {failMsg}
                                </Alert>}
                        </Snackbar>
                    </form>
                </div>
            )}
        </div>
    )
}


const UPLOAD_FILE = gql`
            mutation uploadFile(
            $course_name: String!
            $file_name: String!
            $file_url: String!
            $uploadId: String!
            ){
                uploadFile(
                    course_name: $course_name
            file_name: $file_name
            file_url: $file_url
            uploadId: $uploadId
            ){
                id
            course_name
            file_name
            file_name
            uploadId
            uploadedBy{
                id username
            }
        }
    }
            `;


export default FileUpload;