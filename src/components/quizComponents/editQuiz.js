import React from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import EditQuizForm from "./editQuizForm";

function EditQuiz(props) {

    const quizId = props.match.params.id;

    const { loading, data } = useQuery(FETCH_QUIZ_QUERY, {
        variables: { quizId }
    });

    return (
        <div>
            {
                loading ? <h3>Loading...</h3> :
                    <>
                        <EditQuizForm quiz={data.getQuiz} id={quizId} />
                    </>

            }
        </div>
    );
}


const FETCH_QUIZ_QUERY = gql`
  query($quizId: ID!) {
    getQuiz(quizId: $quizId) {
        id
        questions{
          question
          answersOptions{
              answerText
          }
          correctAnswer
          id
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

export default EditQuiz;