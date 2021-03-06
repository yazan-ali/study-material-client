import React, { useContext } from 'react';
import { AuthContext } from '../userContext';
import AppBar from '../appBar';
import Container from '@material-ui/core/Container';
import QuizizzList from './quizizzList';
import '../styles/quizList.css';
import { useQuery } from '@apollo/client';
import { FETCH_QUIZ_QUERY } from '../../util/graphql';
import Loading from '../loading';

function AllQuizizz() {

    const { user } = useContext(AuthContext);
    const { loading, data } = useQuery(FETCH_QUIZ_QUERY);

    if (loading) {
        return <Loading />
    } else {
        return (
            <div className="quiz-list-root">
                <AppBar backgroundColor={"#4A156B"} />
                <Container maxWidth="lg">
                    {user && <a className="AddQuizBtn" href="/quiz/new">Add New Quiz</a>}
                    <QuizizzList quizizz={data.getQuizizz} quizizzPerPage={12} />
                </Container>
            </div >
        );
    }
}


export default AllQuizizz;