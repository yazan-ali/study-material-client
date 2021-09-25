import React from 'react';
import { Link } from 'react-router-dom';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import DeleteButton from './deleteButton';

function File({ file, fromDashboard }) {
    return (
        <div className="file">
            <div className="file-info">
                {/* <DeleteButton deleteFromDashbord={fromDashboard} handleQuizDelete={props.handleQuizDelete} quizId={props.quiz.id} /> */}
                <DeleteButton deleteFromDashbord={fromDashboard} fileId={file.id} />
                <span>{file.course_name}</span>
                <span>{file.file_name}</span>
                <Link to={`/profile/${file.uploadedBy.username}`} > {`Uploaded by : ${file.uploadedBy.username}`}</Link>
            </div>
            <div className="download-icon">
                <a href={file.file_url}><GetAppRoundedIcon style={{ color: "#5F2384", fontSize: 30 }} /></a>
            </div>
        </div>
    )
}

export default File;