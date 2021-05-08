import React, { useState, useEffect } from 'react';
import App_Bar from '../appBar';
import Container from '@material-ui/core/Container';
import '../styles/quizList.css';
import Axios from 'axios';
import Pagination from '../paginationDoc';

function AllDocuments() {

    const [doc, setDoc] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [docPerPage] = useState(28);


    useEffect(() => {
        Axios.get(`http://localhost:5000/documents`)
            .then(res => {
                if (res.data) {
                    setDoc([...res.data, ...res.data, ...res.data, ...res.data, ...res.data, ...res.data, ...res.data, ...res.data, ...res.data, ...res.data, ...res.data,]);
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
        <div className="quiz-list-root">
            <App_Bar backgroundColor={"#5F1C5A"} />
            <Container maxWidth="lg">
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
            </Container>
        </div >
    );
}

export default AllDocuments;