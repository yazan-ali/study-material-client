import React, { useContext } from 'react';
import '../styles/files.css';
import { Link } from 'react-router-dom';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import DeleteButton from './deleteButton';
import { AuthContext } from '../userContext';

function File({ file, fromDashboard, handelDeleteFile }) {

    const { user } = useContext(AuthContext);

    return (
        <div className="file">
            <div className="file-info">
                {(user && user.id === file.uploadedBy.id) &&
                    <DeleteButton
                        deleteFromDashbord={fromDashboard}
                        fileId={file.id}
                        handelDeleteFile={handelDeleteFile}
                    />
                }
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