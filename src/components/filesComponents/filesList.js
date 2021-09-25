import React, { useState } from 'react';
import Pagination from '../pagination';
import File from './file.js';

function FilesList({ files, filesPerPage, fromDashboard }) {

    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastFile = currentPage * filesPerPage;
    const indexOfFirstFile = indexOfLastFile - filesPerPage;
    const currentFiles = files.slice(indexOfFirstFile, indexOfLastFile);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <div>
            <div className="files-list">
                {
                    currentFiles.map(file => (
                        <File file={file} key={file.id} fromDashboard={fromDashboard} />
                    ))
                }
            </div>
            < Pagination
                totalQuizizz={files.length}
                quizizzPerPage={filesPerPage}
                paginate={paginate}
                currentPage={currentPage}
            />
        </div>
    )
}

export default FilesList;