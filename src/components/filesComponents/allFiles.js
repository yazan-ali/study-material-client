import React, { useContext } from 'react';
import '../styles/files.css';
import { AuthContext } from '../userContext';
import AppBar from '../appBar';
import Container from '@material-ui/core/Container';
import FilesList from './filesList';
import FileUpload from './fileUpload';
import '../styles/quizList.css';
import { useQuery } from '@apollo/client';
import { FETCH_FILES_QUERY } from '../../util/graphql';
import Loading from '../loading';

function AllFiles() {

    const { user } = useContext(AuthContext);
    const { loading, data } = useQuery(FETCH_FILES_QUERY);

    if (loading) {
        return <Loading />
    } else {
        return (
            <div className="file-list-root">
                <AppBar backgroundColor={"#4A156B"} />
                <Container maxWidth="lg">
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                        {user && <FileUpload />}
                        <FilesList files={data.getFiles} filesPerPage={12} />
                    </div>
                </Container>
            </div >
        );
    }
}


export default AllFiles;