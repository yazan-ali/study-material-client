import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { AuthContext } from '../userContext';
import Dashbord from './dashbord';
import Loading from '../loading';

function DashbordData() {

    const { user } = useContext(AuthContext);

    const { loading, data } = useQuery(FETCH_USER_QUERY, {
        variables: { username: user.username }
    });

    return (
        <div>
            {
                loading ? <Loading />
                    :
                    <>
                        <Dashbord userData={data.getUser} />
                    </>

            }
        </div>
    );
}

const FETCH_USER_QUERY = gql`
  query($username: String!){
      getUser(username: $username){
        id
        first_name
        last_name
        username
        university
        major
        image
        quizizz{
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
        files{
            id
            course_name
            file_name
            file_url
            uploadedBy{
                id
                username
            }
            downloads
        }
        posts{
          id
          body
          image
          createdAt
          createdBy{
              first_name
              last_name
              username
              image
          }
          comments{
              createdBy{
                  username
                  first_name
                  last_name
                  image
              }
              id
              body
              createdAt
          }
          likes{
              username
          }
          likeCount
          commentsCount
      }
    }
  }
`

export default DashbordData