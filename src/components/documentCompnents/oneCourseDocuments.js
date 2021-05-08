import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../styles/quizList.css';
import Pagination from '../paginationDoc';

function OneCourseDocuments(props) {

    const [doc, setDoc] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [docPerPage] = useState(28);

    useEffect(() => {
        Axios.get(`http://localhost:5000/documents/${props.course_name}`)
            .then(res => {
                if (res.data) {
                    setDoc([...res.data, ...res.data, ...res.data]);
                }
            });
    }, []);

    const indexOfLastDoc = currentPage * docPerPage;
    const indexOfFirstDoc = indexOfLastDoc - docPerPage;
    const currentDoc = doc.slice(indexOfFirstDoc, indexOfLastDoc);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <div className="Doc-list-root">
            <div className="quiz-list">
                {
                    currentDoc.map(d => (
                        <div className="quiz-div docListBackground">
                            <a href={`/pdf/${d.document}`}>{d.course_name}: {d.document.slice(36)}</a><br />
                            <a href={`/profile/${d.uploadedBy.username}`} > {`uploaded by : ${d.uploadedBy.username}`}</a>
                        </div>
                    ))
                }
            </div>
            < Pagination totalQuizizz={doc.length} quizizzPerPage={docPerPage} paginate={paginate} currentPage={currentPage} />
        </div >
    );
}

export default OneCourseDocuments;