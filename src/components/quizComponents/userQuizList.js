import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/profile.css';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

function UserQuizList(props) {


    const [currentPage, setCurrentPage] = useState(1);
    const [quizizzPerPage] = useState(4);

    const indexOfLastQuiz = currentPage * quizizzPerPage;
    const indexOfFirstQuiz = indexOfLastQuiz - quizizzPerPage;

    const nextPage = () => {
        const lastPage = props.quizizz.length / quizizzPerPage;
        if (currentPage < lastPage)
            setCurrentPage(currentPage + 1);
    }

    const prevPage = () => {
        if (currentPage > 1)
            setCurrentPage(currentPage - 1);
    }

    return (
        <div>
            <div className="user-quiz-list">
                {
                    props.quizizz.slice(indexOfFirstQuiz, indexOfLastQuiz).map(q => (
                        <div className="user-material">
                            <Link to={`/quiz/${q.course_name}/${q.id}`}>{q.course_name} : {q.quiz_title}</Link><br />
                        </div>
                    ))
                }
            </div>
            <div className="nextPrevIcons">
                {currentPage > 1 && <NavigateBeforeIcon style={{ fontSize: 30 }} onClick={prevPage} />}
                {currentPage < props.quizizz.length / quizizzPerPage && <NavigateNextIcon style={{ fontSize: 30 }} onClick={nextPage} />}
            </div>
        </div>
    );
}

export default UserQuizList;