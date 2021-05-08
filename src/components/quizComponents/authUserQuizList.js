import React, { useState } from 'react';
import '../styles/profile.css';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import ProfileQuizCard from './profileQuizCard';


function AuthUserQuizList(props) {


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
            { props.user &&
                <>
                    <div className="user-quiz-list">
                        {
                            props.quizizz.slice(indexOfFirstQuiz, indexOfLastQuiz).map(q => (
                                <ProfileQuizCard quiz={q} user={props.user} handleQuizDelete={props.handleQuizDelete} />
                            ))
                        }
                    </div>
                    <div className="nextPrevIcons">
                        {currentPage > 1 && <NavigateBeforeIcon style={{ fontSize: 30 }} onClick={prevPage} />}
                        {currentPage < props.quizizz.length / quizizzPerPage && <NavigateNextIcon style={{ fontSize: 30 }} onClick={nextPage} />}
                    </div>
                </>
            }
        </div >
    );
}

export default AuthUserQuizList;