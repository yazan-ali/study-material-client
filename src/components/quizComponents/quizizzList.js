import React, { useState } from 'react';
import Pagination from '../pagination';
import QuizItem from './quizItem';

function QuizizzList({ quizizz, quizizzPerPage, fromDashboard }) {

    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastQuiz = currentPage * quizizzPerPage;
    const indexOfFirstQuiz = indexOfLastQuiz - quizizzPerPage;
    const currentQuizizz = quizizz.slice(indexOfFirstQuiz, indexOfLastQuiz);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <div>
            <div style={{ marginTop: 20 }} className="quiz-list">
                {
                    currentQuizizz.map(q => (
                        <QuizItem quiz={q} key={q.id} fromDashboard={fromDashboard} />
                    ))
                }
            </div>
            < Pagination
                totalItems={quizizz.length}
                itemsPerPage={quizizzPerPage}
                paginate={paginate}
                currentPage={currentPage}
            />
        </div>
    )
}

export default QuizizzList;