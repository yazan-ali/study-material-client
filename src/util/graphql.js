import { gql } from "@apollo/client";

export const FETCH_QUIZ_QUERY = gql`
  {
      getQuizizz{
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
        # createdAt
      }
  }
`

export const FETCH_POSTS_QUERY = gql`
  {
      getPosts{
        id
        body
        image
        createdAt
        createdBy{
          first_name
          last_name
          username
        }
        comments{
            body
            first_name
            last_name
            username
            id
        }
        likes{
            username
        }
        likeCount
        commentsCount
      }
  }
`;

export const FETCH_COURSE_NAME_QUERY = gql`
  {
      getCourseName
  }
`;