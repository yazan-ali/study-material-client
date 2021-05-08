import React, { useState } from 'react';
import '../styles/profile.css';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';


function UserDocList(props) {

    const [docCurrentPage, setDocCurrentPage] = useState(1);
    const [docPerPage] = useState(4);

    const indexOfLastDoc = docCurrentPage * docPerPage;
    const indexOfFirstDoc = indexOfLastDoc - docPerPage


    const docNextPage = () => {
        const lastPage = props.doc.length / docPerPage;
        if (docCurrentPage < lastPage)
            setDocCurrentPage(docCurrentPage + 1);
    }

    const docPrevPage = () => {
        if (docCurrentPage > 1)
            setDocCurrentPage(docCurrentPage - 1);
    }

    return (
        <div>
            <div className="user-quiz-list">
                {
                    props.doc.slice(indexOfFirstDoc, indexOfLastDoc).map(d => (
                        <div className="user-material">
                            <a href={`/pdf/${d.document}`}>{d.document.slice(36)}</a>
                        </div>
                    ))
                }
            </div>
            <div className="nextPrevIcons">
                {docCurrentPage > 1 && <NavigateBeforeIcon style={{ fontSize: 30 }} onClick={docPrevPage} />}
                {docCurrentPage < props.doc.length / docPerPage && <NavigateNextIcon style={{ fontSize: 30 }} onClick={docNextPage} />}
            </div>
        </div >
    );
}

export default UserDocList;