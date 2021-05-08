import React, { useState, useEffect } from 'react';
import '../styles/profile.css';
import Axios from 'axios';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Fileupload from './fileupload';
import DeleteIcon from '@material-ui/icons/Delete';


function UserDocList(props) {

    useEffect(() => {
        Axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:5000/currentUser",
        }).then(res => {
            if (res.data) {
                setUser(res.data);
            }
        });
    }, []);

    const [user, setUser] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [docCurrentPage, setDocCurrentPage] = useState(1);
    const [docPerPage] = useState(4);

    const indexOfLastDoc = docCurrentPage * docPerPage;
    const indexOfFirstDoc = indexOfLastDoc - docPerPage;

    const docNextPage = () => {
        const lastPage = props.doc.length / docPerPage;
        if (docCurrentPage < lastPage)
            setDocCurrentPage(docCurrentPage + 1);
    }

    const docPrevPage = () => {
        if (docCurrentPage > 1)
            setDocCurrentPage(docCurrentPage - 1);
    }

    const showUploadForm = () => {
        setShowForm(!showForm);
    }

    const handleDelete = (id) => {
        props.handleDelete(id);
    };

    return (
        <div>
            <div style={{ marginBottom: "15px" }}>
                <button style={{ border: "none" }} className="addQuizBtn" onClick={showUploadForm}>{showForm ? "Cancel" : "Upload New File"}</button>
            </div>
            {

                showForm ? user.auth && <Fileupload /> :

                    user.auth && (
                        <>
                            <div className="user-quiz-list">
                                {
                                    props.doc.slice(indexOfFirstDoc, indexOfLastDoc).map(d => (
                                        <div className="user-material">
                                            <a href={`/pdf/${d.document}`}>{d.document.slice(36)}</a>
                                            < DeleteIcon onClick={() => handleDelete(d._id)} style={{ color: "#fff" }} />
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="nextPrevIcons">
                                {docCurrentPage > 1 && <NavigateBeforeIcon style={{ fontSize: 30 }} onClick={docPrevPage} />}
                                {docCurrentPage < props.doc.length / docPerPage && <NavigateNextIcon style={{ fontSize: 30 }} onClick={docNextPage} />}
                            </div>
                        </>
                    )
            }
        </div >
    );
}

export default UserDocList;