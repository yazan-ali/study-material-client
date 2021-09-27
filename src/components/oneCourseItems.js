import React, { useState } from 'react';
import AppBar from './appBar';
import Container from '@material-ui/core/Container';
import QuizizzList from './quizComponents/quizizzList';
import FilesList from './filesComponents/filesList';
import "./styles/quizList.css"
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import Loading from './loading';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

function OneCourseItems(props) {

    const course_name = props.match.params.course_name;

    const [openMenu, setOpenMenu] = useState(false);
    const [itemsType, setItemsType] = useState("Quizizz");

    const handleClick = (event) => {
        setOpenMenu(event.currentTarget);
        console.log(event.currentTarget)
    };

    const handleClose = () => {
        setOpenMenu(null);
    };

    const handleItemsTypeChange = (type) => {
        setItemsType(type);
        handleClose()
    }

    const { loading, data } = useQuery(FETCH_ITEMS_QUERY, {
        variables: { course_name }
    });

    if (loading) {
        return <Loading />
    } else {
        return (
            <div className="quiz-list-root">
                <AppBar backgroundColor={"#4A156B"} />
                <Container maxWidth="lg">
                    <button style={{ display: "flex", justifyContent: "center", width: 100 }} className="AddQuizBtn" onClick={handleClick}>
                        <span>{itemsType}</span>
                        <span style={{ marginTop: 3 }}><ArrowDropDownIcon /></span>
                    </button>
                    <Menu
                        id="simple-menu"
                        anchorEl={openMenu}
                        keepMounted
                        open={Boolean(openMenu)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => handleItemsTypeChange("Quizizz")}>Quizizz</MenuItem>
                        <MenuItem onClick={() => handleItemsTypeChange("Files")}>Files</MenuItem>
                    </Menu>
                    {
                        itemsType === "Quizizz" ? (
                            data.getItemsByCourseName.quizizz.length > 0 ? (
                                <QuizizzList quizizz={data.getItemsByCourseName.quizizz} quizizzPerPage={12} />

                            ) : (
                                <h3>No Quizizz Found</h3>
                            )
                        ) : (
                            data.getItemsByCourseName.files.length > 0 ? (
                                <FilesList files={data.getItemsByCourseName.files} filesPerPage={12} />
                            ) : (
                                <h3>No Documents Found</h3>
                            )
                        )
                    }
                </Container>
            </div >
        );
    }
}

const FETCH_ITEMS_QUERY = gql`
  query($course_name: String!) {
    getItemsByCourseName(course_name: $course_name) {
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
            file_name
            course_name
            file_url
            uploadedBy{
                id
                username
            }
        }
    }
  }
`;

export default OneCourseItems;