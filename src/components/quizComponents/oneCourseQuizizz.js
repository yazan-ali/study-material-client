// import React, { useState, useEffect } from 'react';
// import Axios from 'axios';
// import '../styles/quizList.css';
// import Pagination from '../pagination';
// import QuizItem from './quizItem';

// function OneCourseQuizizz(props) {

//     const [quizizz, setQuizizz] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [quizizzPerPage] = useState(28);

//     useEffect(() => {
//         Axios.get(`http://localhost:5000/quiz/${props.course_name}`)
//             .then(res => {
//                 if (res.data) {
//                     setQuizizz(res.data);
//                 }
//             });
//     });

//     const indexOfLastQuiz = currentPage * quizizzPerPage;
//     const indexOfFirstQuiz = indexOfLastQuiz - quizizzPerPage;
//     const currentQuizizz = quizizz.slice(indexOfFirstQuiz, indexOfLastQuiz);

//     const paginate = (pageNumber) => {
//         setCurrentPage(pageNumber);
//     }

//     return (
//         <div className="quiz-list-root">
//             <div className="quiz-list">
//                 {
//                     currentQuizizz.map(q => (
//                         <QuizItem quiz={q} key={q._id} />
//                     ))
//                 }
//             </div>
//             < Pagination totalQuizizz={quizizz.length} quizizzPerPage={quizizzPerPage} paginate={paginate} currentPage={currentPage} />
//         </div >
//     );
// }

// export default OneCourseQuizizz;



import React, { useState } from 'react';
import App_Bar from '../appBar';
import Container from '@material-ui/core/Container';
import '../styles/quizList.css';
import Pagination from '../pagination';
import QuizItem from './quizItem';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import Loading from '../loading';

function OneCourseQuizizz(props) {

    const [currentPage, setCurrentPage] = useState(1);
    const [quizizzPerPage] = useState(12);

    const course_name = props.match.params.course_name;

    const { loading, data } = useQuery(FETCH_QUIZIZZ_QUERY, {
        variables: { course_name }
    });

    if (loading) {
        return <Loading />
    } else {
        const indexOfLastQuiz = currentPage * quizizzPerPage;
        const indexOfFirstQuiz = indexOfLastQuiz - quizizzPerPage;
        const currentQuizizz = data.getQuizizzByCourseName.slice(indexOfFirstQuiz, indexOfLastQuiz);

        const paginate = (pageNumber) => {
            setCurrentPage(pageNumber);
        }

        return (
            <div className="quiz-list-root">
                <App_Bar backgroundColor={"#007991"} />
                <Container maxWidth="lg">
                    <div className="quiz-list">
                        {
                            currentQuizizz.map(q => (
                                <QuizItem quiz={q} key={q._id} />
                            ))
                        }
                    </div>
                    < Pagination totalQuizizz={data.getQuizizzByCourseName.length} quizizzPerPage={quizizzPerPage} paginate={paginate} currentPage={currentPage} />
                </Container>
            </div >
        );
    }
}

const FETCH_QUIZIZZ_QUERY = gql`
  query($course_name: String!) {
    getQuizizzByCourseName(course_name: $course_name) {
        id
        questions{
          question
          answersOptions{
              answerText
          }
          correctAnswer
        }
        course_name
        quiz_title
        number_of_questions
        isOneWay
        createdBy{
            username
            id
        }
        up_votes
        down_votes
        up_votes_counts
        down_votes_counts
        participants
    }
  }
`;

export default OneCourseQuizizz;