import React, { useContext } from 'react';
import OneWayQuiz from './oneWayQuiz';
import BothWayQuiz from './bothWayQuiz';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { AuthContext } from '../userContext';
import Loading from '../loading';

function Quiz(props) {

    const quizId = props.match.params.id;

    const { loading, data } = useQuery(FETCH_QUIZ_QUERY, {
        variables: { quizId }
    });

    const { user } = useContext(AuthContext);

    return (
        <div className="App">
            {
                loading ? <Loading /> :
                    (
                        // if the quiz is one way
                        data.getQuiz.isOneWay ?
                            <OneWayQuiz
                                quiz={data.getQuiz}
                                user={user}
                            />
                            :
                            // if the quiz is both way
                            < BothWayQuiz
                                quiz={data.getQuiz}
                                user={user}
                            />
                    )

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

export default Quiz;