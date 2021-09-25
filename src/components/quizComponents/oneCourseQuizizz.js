import React from 'react';
import AppBar from '../appBar';
import Container from '@material-ui/core/Container';
import QuizizzList from './quizizzList';
import '../styles/quizList.css';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import Loading from '../loading';

function OneCourseQuizizz(props) {

    const course_name = props.match.params.course_name;

    const { loading, data } = useQuery(FETCH_QUIZIZZ_QUERY, {
        variables: { course_name }
    });

    if (loading) {
        return <Loading />
    } else {
        return (
            <div className="quiz-list-root">
                <AppBar backgroundColor={"#4A156B"} />
                <Container maxWidth="lg">
                    <QuizizzList quizizz={data.getQuizizzByCourseName} quizizzPerPage={12} />
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