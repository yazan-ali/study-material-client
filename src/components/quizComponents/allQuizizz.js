import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../userContext';
import AppBar from '../appBar';
import Container from '@material-ui/core/Container';
import '../styles/quizList.css';
import Pagination from '../pagination';
import QuizItem from './quizItem';
import { useQuery } from '@apollo/client';
import { FETCH_QUIZ_QUERY } from '../../util/graphql';
import Loading from '../loading';

function AllQuizizz() {

    const { user } = useContext(AuthContext);

    const [currentPage, setCurrentPage] = useState(1);
    const [quizizzPerPage] = useState(12);
    const { loading, data } = useQuery(FETCH_QUIZ_QUERY);

    if (loading) {
        return <Loading />
    } else {
        const indexOfLastQuiz = currentPage * quizizzPerPage;
        const indexOfFirstQuiz = indexOfLastQuiz - quizizzPerPage;
        const currentQuizizz = data.getQuizizz.slice(indexOfFirstQuiz, indexOfLastQuiz);

        const paginate = (pageNumber) => {
            setCurrentPage(pageNumber);
        }

        return (
            <div className="quiz-list-root">
                <AppBar backgroundColor={"#4A156B"} />
                <Container maxWidth="lg">
                    {user && <a className="AddQuizBtn" href="/quiz/new">Add New Quiz</a>}
                    <div style={{ marginTop: 20 }} className="quiz-list">
                        {
                            currentQuizizz.map(q => (
                                <QuizItem quiz={q} key={q._id} />
                            ))
                        }
                    </div>
                    < Pagination totalQuizizz={data.getQuizizz.length} quizizzPerPage={quizizzPerPage} paginate={paginate} currentPage={currentPage} />
                </Container>
            </div >
        );
    }
}


export default AllQuizizz;