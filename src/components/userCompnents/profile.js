import React, { useState, useContext } from 'react';
import '../styles/profile.css';
import Container from '@material-ui/core/Container';
import AppBar1 from '../appBar';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import Loading from '../loading';
import Avatar from '@material-ui/core/Avatar';
import QuizItem from '../quizComponents/quizItem';
import PostCard from '../postsComponets/postCard';
import File from '../filesComponents/file.js';
import { AuthContext } from '../userContext';


function Profile(props) {

    const { user } = useContext(AuthContext);

    const { loading, data } = useQuery(FETCH_USER_QUERY, {
        variables: { username: props.match.params.username }
    });

    const [tab, setTab] = useState(0);


    const handleTabsChange = (value) => {
        setTab(value);
    };

    return (
        <>
            {
                loading ? <Loading /> :
                    (
                        <div>
                            <AppBar1 backgroundColor={"#4A156B"} />
                            <Container maxWidth="lg">
                                <div className="profile-container">
                                    <div className="profile-card">
                                        {
                                            data.getUser.image ? (
                                                <img src={data.getUser.image} className="profile-pic" alt="profile-pic" />
                                            ) : (
                                                <Avatar
                                                    style={{
                                                        width: 90,
                                                        height: 90,
                                                        fontSize: 30,
                                                        backgroundColor: "#fff",
                                                        color: "#5F2384",
                                                        fontWeight: 600
                                                    }} alt="Remy Sharp">
                                                    {data.getUser.first_name[0].toUpperCase()}  {data.getUser.last_name[0].toUpperCase()}
                                                </Avatar>
                                            )
                                        }
                                        <div className="user-info">
                                            <h3>{data.getUser.first_name} {data.getUser.last_name}</h3>
                                            <h3> {data.getUser.university}</h3>
                                            <h3>{data.getUser.major}</h3>
                                        </div>
                                        <div className="tabs-bar">
                                            <button style={{ borderBottom: tab === 0 && "4px solid #5F2384" }} onClick={() => handleTabsChange(0)}>Quizizz</button>
                                            <button style={{ borderBottom: tab === 1 && "4px solid #5F2384" }} onClick={() => handleTabsChange(1)}>Documents</button>
                                            <button style={{ borderBottom: tab === 2 && "4px solid #5F2384" }} onClick={() => handleTabsChange(2)}>Posts</button>
                                        </div>
                                    </div>
                                    {tab === 0 && (
                                        <div style={{ marginTop: 50 }}>
                                            {user && <a className="AddQuizBtn" href="/quiz/new">Add New Quiz</a>}
                                            <div style={{ marginTop: 20 }} className="quiz-list">
                                                {
                                                    data.getUser.quizizz.map(q => (
                                                        <QuizItem quiz={q} key={q.id} />
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    )}
                                    {tab === 1 && (
                                        <div style={{ marginTop: 50, width: "100%" }}>
                                            <div style={{ marginTop: 10 }} className="files-list">
                                                {
                                                    data.getUser.files.map(file => (
                                                        <File key={file.id} file={file} />
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    )}
                                    {tab === 2 && (
                                        <div style={{ marginTop: 50 }} className="posts-container">
                                            {
                                                data.getUser.posts.map(post => (
                                                    <PostCard key={post.id} post={post} />
                                                ))
                                            }
                                        </div>
                                    )}
                                </div>
                            </Container>
                        </div >
                    )
            }
        </>
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
                first_name
                last_name
                username
                image
              }
              id
              body
          }
          commentsCount
          likeCount
        }
      }
  }
`

export default Profile;